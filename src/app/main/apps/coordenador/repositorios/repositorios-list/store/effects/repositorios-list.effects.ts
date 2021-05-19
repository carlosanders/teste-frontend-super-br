import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositorioListActions from '../actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models/repositorio.model';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from "../../../../../../../../@cdk/utils";

@Injectable()
export class RepositoriosListEffect {

    routerState: any;

    id: string;
    value: string;

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.id = 'generoHandle_entidadeHandle';
                    this.value = this.routerState.params.generoHandle + '_' +
                        this.routerState.params.entidadeHandle;
                    if (this.routerState.params['unidadeHandle']) {
                        this.id += '_unidadeHandle';
                        this.value += '_' + this.routerState.params.unidadeHandle;
                    }
                    if (this.routerState.params['setorHandle']) {
                        this.id += '_setorHandle';
                        this.value += '_' + this.routerState.params.setorHandle;
                    }
                }
            });
    }

    /**
     * Get Repositorios with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getRepositorios: any =
        this._actions
            .pipe(
                ofType<RepositorioListActions.GetRepositorios>(RepositorioListActions.GET_REPOSITORIOS),
                switchMap((action) => {
                    const filter = {
                        ...action.payload.filter,
                        ...action.payload.gridFilter,
                    };
                    let mode = 'query';
                    if (filter.hasOwnProperty('documento.componentesDigitais.conteudo')) {
                        mode = 'search';
                    }
                    return this._repositorioService[`${mode}`](
                        JSON.stringify(filter),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<Repositorio>({data: response['entities'], schema: repositorioSchema}),
                            new RepositorioListActions.GetRepositoriosSuccess({
                                entitiesId: response['entities'].map(repositorio => repositorio.id),
                                loaded: {
                                    id: this.id,
                                    value: this.value
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RepositorioListActions.GetRepositoriosFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Repositorio
     * @type {Observable<any>}
     */
    @Effect()
    deleteRepositorio: any =
        this._actions
            .pipe(
                ofType<RepositorioListActions.DeleteRepositorio>(RepositorioListActions.DELETE_REPOSITORIO),
                mergeMap((action) => {
                    return this._repositorioService.destroy(action.payload).pipe(
                        map((response) => new RepositorioListActions.DeleteRepositorioSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new RepositorioListActions.DeleteRepositorioFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );

    /**
     * Save Repositorio
     * @type {Observable<any>}
     */
    @Effect()
    saveRepositorio: any =
        this._actions
            .pipe(
                ofType<RepositorioListActions.SaveRepositorio>(RepositorioListActions.SAVE_REPOSITORIO),
                switchMap((action) => {
                    return this._repositorioService.save(action.payload.repositorio).pipe(
                        mergeMap((response: Repositorio) => [
                            new UpdateData<Repositorio>({id: response.id, schema: repositorioSchema, changes: {}}),
                            new RepositorioListActions.SaveRepositorioSuccess(),  new OperacoesActions.Resultado({
                                type: 'repositorio',
                                content: `Repositorio id ${response.id} editada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new RepositorioListActions.SaveRepositorioFailed(err));
                        })
                    );
                })
            );
}

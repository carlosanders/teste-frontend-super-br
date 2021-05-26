import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositoriosEspecieSetorListActions from '../actions';

import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {VinculacaoRepositorio} from '@cdk/models';
import {vinculacaoRepositorio as vinculacaoRepositorioschema} from '@cdk/normalizr';
import {CdkUtils} from '../../../../../../../../../@cdk/utils';

@Injectable()
export class RepositoriosEspecieSetorListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoRepositorioservice: VinculacaoRepositorioService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get VinculacoesRepositorio with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getRepositoriosEspecieSetor: any =
        this._actions
            .pipe(
                ofType<RepositoriosEspecieSetorListActions.GetRepositoriosEspecieSetor>(RepositoriosEspecieSetorListActions.GET_REPOSITORIOS_ESPECIE_SETOR),
                switchMap(action => this._vinculacaoRepositorioservice.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap(response => [
                            new AddData<VinculacaoRepositorio>({data: response['entities'], schema: vinculacaoRepositorioschema}),
                            new RepositoriosEspecieSetorListActions.GetRepositoriosEspecieSetorSuccess({
                                entitiesId: response['entities'].map(vinculacaoRepositorio => vinculacaoRepositorio.id),
                                loaded: {
                                    id: 'repositorioHandle',
                                    value: this.routerState.params.repositorioHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RepositoriosEspecieSetorListActions.GetRepositoriosEspecieSetorFailed(err));
                        })
                    ))
            );

    /**
     * Delete VinculacaoRepositorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteRepositorioEspecieSetor: any =
        this._actions
            .pipe(
                ofType<RepositoriosEspecieSetorListActions.DeleteRepositorioEspecieSetor>(RepositoriosEspecieSetorListActions.DELETE_REPOSITORIO_ESPECIE_SETOR),
                mergeMap(action => this._vinculacaoRepositorioservice.destroy(action.payload).pipe(
                        map(response => new RepositoriosEspecieSetorListActions.DeleteRepositorioEspecieSetorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new RepositoriosEspecieSetorListActions.DeleteRepositorioEspecieSetorFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ))
            );
}

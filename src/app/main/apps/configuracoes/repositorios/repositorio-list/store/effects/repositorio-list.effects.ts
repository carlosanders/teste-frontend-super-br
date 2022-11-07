import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositorioListActions from '../actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class RepositorioListEffect {
    routerState: any;
    /**
     * Get Repositorios with router parameters
     *
     * @type {Observable<any>}
     */
    getRepositorios: any = createEffect(() => this._actions.pipe(
        ofType<RepositorioListActions.GetRepositorios>(RepositorioListActions.GET_REPOSITORIOS),
        switchMap((action) => {
            const filters = {
                ...action.payload.filter,
                ...action.payload.gridFilter,
            };
            let mode = 'query';
            if (JSON.stringify(filters).indexOf('componentesDigitais.conteudo') > -1) {
                mode = 'search';
            }
            return this._repositorioService[`${mode}`](
                JSON.stringify(filters),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(action.payload.context));
        }),
        mergeMap(response => [
            new AddData<Repositorio>({data: response['entities'], schema: repositorioSchema}),
            new RepositorioListActions.GetRepositoriosSuccess({
                entitiesId: response['entities'].map(repositorio => repositorio.id),
                loaded: {
                    id: 'usuarioHandle',
                    value: this._loginService.getUserProfile().id
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RepositorioListActions.GetRepositoriosFailed(err));
        })
    ));
    /**
     * Delete Repositorio
     *
     * @type {Observable<any>}
     */
    deleteRepositorio: Observable<RepositorioListActions.RepositorioListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RepositorioListActions.DeleteRepositorio>(RepositorioListActions.DELETE_REPOSITORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'repositorio',
            content: 'Apagando a repositório id ' + action.payload.repositorioId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._repositorioService.destroy(action.payload.repositorioId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'repositorio',
                    content: 'Repositório id ' + action.payload.repositorioId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Repositorio>({
                    id: response.id,
                    schema: repositorioSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RepositorioListActions.DeleteRepositorioSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.repositorioId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'repositorio',
                    content: 'Erro ao apagar a repositório id ' + action.payload.repositorioId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RepositorioListActions.DeleteRepositorioFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _repositorioService: RepositorioService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

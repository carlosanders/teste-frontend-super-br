import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositorioListActions from '../actions';

import {RepositorioService} from '@cdk/services/repositorio.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Repositorio} from '@cdk/models/repositorio.model';
import {repositorio as repositorioSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RepositoriosListEffect {
    routerState: any;
    id: string;
    value: string;
    /**
     * Get Repositorios with router parameters
     *
     * @type {Observable<any>}
     */
    getRepositorios: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Delete Repositorio
     *
     * @type {Observable<any>}
     */
    deleteRepositorio: Observable<RepositorioListActions.RepositoriosListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RepositorioListActions.DeleteRepositorio>(RepositorioListActions.DELETE_REPOSITORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tese',
            content: 'Apagando a tese id ' + action.payload.repositorioId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._repositorioService.destroy(action.payload.repositorioId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tese',
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
                    type: 'tese',
                    content: 'Erro ao apagar a tese id ' + action.payload.repositorioId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RepositorioListActions.DeleteRepositorioFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Repositorio
     *
     * @type {Observable<any>}
     */
    saveRepositorio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RepositorioListActions.SaveRepositorio>(RepositorioListActions.SAVE_REPOSITORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tese',
            content: 'Editando a tese id ' + action.payload.repositorio.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        switchMap(action => this._repositorioService.save(action.payload.repositorio).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tese',
                content: 'Repositório id ' + action.payload.repositorio.id + ' editada com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Repositorio) => [
                new UpdateData<Repositorio>({id: response.id, schema: repositorioSchema, changes: {}}),
                new RepositorioListActions.SaveRepositorioSuccess()
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tese',
                    content: 'Erro ao editar a tese id ' + action.payload.repositorio.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new RepositorioListActions.SaveRepositorioFailed(err));
            })
        ))
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
        });
    }
}

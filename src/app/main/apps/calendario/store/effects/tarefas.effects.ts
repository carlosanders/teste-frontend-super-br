import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefasActions from '../actions/tarefas.actions';

import {Tarefa} from '@cdk/models';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import * as OperacoesActions from '../../../../../store/actions/operacoes.actions';

@Injectable()
export class TarefasEffect {
    routerState: any;
    /**
     * Get Tarefas with router parameters
     *
     * @type {Observable<any>}
     */
    getTarefas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.GetTarefas>(TarefasActions.GET_TAREFAS),
        switchMap(action => this._tarefaService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.folderFilter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)
        )),
        mergeMap(response => [
            new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
            new TarefasActions.GetTarefasSuccess({
                entitiesId: response['entities'].map(tarefa => tarefa.id),
                loaded: {
                    id: 'contextHandle_typeHandle_alvoHandle',
                    value: this.routerState.params.contextHandle + '_' + this.routerState.params.typeHandle + '_' + this.routerState.params.alvoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TarefasActions.GetTarefasFailed(err));
        })
    ));
    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    saveTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.SaveTarefa>(TarefasActions.SAVE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Alterando a tarefa ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._tarefaService.patch(action.payload.tarefa, action.payload.changes).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Tarefa id ' + response.id + ' alterando com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Tarefa) => [
                new TarefasActions.SaveTarefaSuccess(response),
                new AddData<Tarefa>({data: [response], schema: tarefaSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao alterar a tarefa!',
                    status: 2, // erro
                }));
                return of(new TarefasActions.SaveTarefaFailed(err));
            })
        ))
    ));
    /**
     * Save Tarefa Success
     */
    saveTarefaSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.SaveTarefaSuccess>(TarefasActions.SAVE_TAREFA_SUCCESS),
        tap(() => {
            // this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
        })
    ), {dispatch: false});
    /**
     * Update Tarefa
     *
     * @type {Observable<any>}
     */
    createTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.CreateTarefa>(TarefasActions.CREATE_TAREFA),
        tap(() => {
            this._router.navigate(['apps/tarefas/administrativo/minhas-tarefas/entrada/criar']).then();
        })
    ), {dispatch: false});
    /**
     * Delete Tarefa
     *
     * @type {Observable<any>}
     */
    deleteTarefa: Observable<TarefasActions.TarefasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefasActions.DeleteTarefa>(TarefasActions.DELETE_TAREFA),
        tap((action) => {
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Apagando a tarefa id ' + action.payload.tarefaId + '...',
                status: 0, // carregando
                lote: action.payload.loteId
            }));
        }),
        mergeMap(action => this._tarefaService.destroy(action.payload.tarefaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Tarefa id ' + action.payload.tarefaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Tarefa>({
                    id: response.id,
                    schema: tarefaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new TarefasActions.DeleteTarefaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.tarefaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao apagar a tarefa id ' + action.payload.tarefaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new TarefasActions.DeleteTarefaFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

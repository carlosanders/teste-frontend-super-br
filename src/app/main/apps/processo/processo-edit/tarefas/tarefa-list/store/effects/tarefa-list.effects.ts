import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefaListActions from '../actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Tarefa} from '@cdk/models';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TarefaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
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
     * Get Tarefas with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTarefas: any =
        this._actions
            .pipe(
                ofType<TarefaListActions.GetTarefas>(TarefaListActions.GET_TAREFAS),
                switchMap(action => this._tarefaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
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
                    new TarefaListActions.GetTarefasSuccess({
                        entitiesId: response['entities'].map(tarefa => tarefa.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TarefaListActions.GetTarefasFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteTarefa: Observable<TarefaListActions.TarefaListActionsAll> =
        this._actions
            .pipe(
                ofType<TarefaListActions.DeleteTarefa>(TarefaListActions.DELETE_TAREFA),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Apagando a tarefa id ' + action.payload.tarefaId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._tarefaService.destroy(action.payload.tarefaId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tarefa',
                                content: 'Tarefa id ' + action.payload.tarefaId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Tarefa>({
                                id: response.id,
                                schema: tarefaSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new TarefaListActions.DeleteTarefaSuccess(response.id);
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
                            return of(new TarefaListActions.DeleteTarefaFailed(payload));
                        })
                    );
                }, 25)
            );

}

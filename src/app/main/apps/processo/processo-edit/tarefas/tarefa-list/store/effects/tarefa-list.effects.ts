import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefaListActions from '../actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Tarefa} from '@cdk/models';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';
import * as ProcessoActions from '../../../../../store/actions/processo.actions';
import {
    TableDefinitionsService
} from '../../../../../../../../../@cdk/components/table-definitions/table-definitions.service';
import {TarefaListComponent} from '../../tarefa-list.component';

@Injectable()
export class TarefaListEffect {
    routerState: any;
    /**
     * Get Tarefas with router parameters
     *
     * @type {Observable<any>}
     */
    getTarefas: any = createEffect(() => this._actions.pipe(
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
        ).pipe(
            mergeMap(response => [
                new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema, populate: action.payload.populate}),
                new TarefaListActions.GetTarefasSuccess({
                    entitiesId: response['entities'].map(tarefa => tarefa.id),
                    loaded: {
                        id: 'processoHandle',
                        value: this.routerState.params.processoHandle
                    },
                    total: response['total']
                }),
                new ProcessoActions.GetTarefasProcessoSuccess({
                    entitiesId: response['entities'].filter(tarefa => !tarefa.dataHoraConclusaoPrazo).map(tarefa => tarefa.id),
                }),
            ]),
            catchError((err) => {
                console.log(err);
                this._tableDefinitionsService.deleteTableDefinitions(
                    this._tableDefinitionsService.generateTableDeinitionIdentifier(TarefaListComponent.GRID_DEFINITIONS_KEYS)
                ).subscribe();
                return of(new TarefaListActions.GetTarefasFailed(err));
            })
        ))
    ));
    /**
     * Delete Tarefa
     *
     * @type {Observable<any>}
     */
    deleteTarefa: Observable<TarefaListActions.TarefaListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TarefaListActions.DeleteTarefa>(TarefaListActions.DELETE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Apagando a tarefa id ' + action.payload.tarefaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
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
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _store: Store<State>,
        private _tableDefinitionsService: TableDefinitionsService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}

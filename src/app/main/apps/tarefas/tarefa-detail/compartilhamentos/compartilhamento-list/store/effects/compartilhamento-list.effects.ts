import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, exhaustMap, filter, map, mergeAll, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as CompartilhamentoListActions
    from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/actions';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';
import {getBufferingDelete, getDeletingIds} from '../selectors';
import {CdkUtils} from '../../../../../../../../../@cdk/utils';

@Injectable()
export class CompartilhamentoListEffect {

    routerState: any;
    /**
     * Get Compartilhamentos with router parameters
     *
     * @type {Observable<any>}
     */
    getCompartilhamentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoListActions.GetCompartilhamentos>(CompartilhamentoListActions.GET_COMPARTILHAMENTOS),
        exhaustMap(action => this._compartilhamentoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.folderFilter,
                ...action.payload.listFilter,
                ...action.payload.etiquetaFilter,
                ...action.payload.gridFilter
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Compartilhamento>({data: response['entities'], schema: compartilhamentoSchema}),
            new CompartilhamentoListActions.GetCompartilhamentosSuccess({
                entitiesId: response['entities'].map(compartilhamento => compartilhamento.id),
                loaded: {
                    id: 'tarefaHandle',
                    value: this.routerState.params.tarefaHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new CompartilhamentoListActions.GetCompartilhamentosFailed(err));
        })
    ));
    /**
     * Delete Compartilhamento
     *
     * @type {Observable<any>}
     */
    deleteCompartilhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoListActions.DeleteCompartilhamento>(CompartilhamentoListActions.DELETE_COMPARTILHAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'compartilhamento',
            content: 'Apagando o compartilhamento id ' + action.payload.compartilhamentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo
        }))),
        buffer(this._store.pipe(select(getBufferingDelete))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getDeletingIds))),
        mergeMap(([action, deletingIds]) => {
            if (deletingIds.indexOf(action.payload.compartilhamentoId) === -1) {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'compartilhamento',
                    content: 'Operação de apagar o compartilhamento id ' + action.payload.compartilhamentoId + ' foi cancelada!',
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
                return of(new CompartilhamentoListActions.DeleteCompartilhamentoCancelSuccess(action.payload.compartilhamentoId));
            }
            return this._compartilhamentoService.destroy(action.payload.compartilhamentoId).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'compartilhamento',
                        content: 'Compartilhamento id ' + action.payload.compartilhamentoId + ' deletado com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    this._store.dispatch(new UpdateData<Compartilhamento>({
                        id: response.id,
                        schema: compartilhamentoSchema,
                        changes: {apagadoEm: response.apagadoEm}
                    }));
                    return new CompartilhamentoListActions.DeleteCompartilhamentoSuccess(response.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.compartilhamentoId,
                        error: CdkUtils.errorsToString(err)
                    };
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'compartilhamento',
                        content: 'Erro ao apagar o compartilhamento id ' + action.payload.compartilhamentoId + '!',
                        status: 2, // erro
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    console.log(err);
                    return of(new CompartilhamentoListActions.DeleteCompartilhamentoFailed(payload));
                })
            );
        }, 25)
    ));

    constructor(
        private _actions: Actions,
        private _compartilhamentoService: CompartilhamentoService,
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

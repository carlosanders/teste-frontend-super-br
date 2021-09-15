import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as WorkflowListActions from '../actions';
import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {getRouterState, State} from '../../../../../../../../../store';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {LoginService} from '../../../../../../../../auth/login/login.service';
import {TransicaoWorkflow} from '@cdk/models';
import * as OperacoesActions from '../../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TransicaoWorkflowListEffects {

    routerState: any;
    /**
     * Get Workflow with router parameters
     *
     * @type {Observable<any>}
     */
    getWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<WorkflowListActions.GetTransicaoWorkflow>(WorkflowListActions.GET_TRANSICAO_WORKFLOW),
        switchMap(action => this._transicaoWorkflowService.query(
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
                new AddData<TransicaoWorkflow>({data: response['entities'], schema: transicaoWorkflowSchema}),
                new WorkflowListActions.GetTransicaoWorkflowSuccess({
                    entitiesId: response['entities'].map(transicaoWorkflow => transicaoWorkflow.id),
                    loaded: {
                        id: 'workflowHandle',
                        value: this.routerState.params.workflowHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new WorkflowListActions.GetTransicaoWorkflowFailed(err));
            })
        ))
    ));
    /**
     * Delete Workflow
     *
     * @type {Observable<any>}
     */
    deleteWorkflow: Observable<WorkflowListActions.TransicaoWorkflowListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<WorkflowListActions.DeleteTransicaoWorkflow>(WorkflowListActions.DELETE_TRANSICAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'workflow',
            content: 'Apagando a transição de workflow id ' + action.payload.transicaoWorkflowId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._transicaoWorkflowService.destroy(action.payload.transicaoWorkflowId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'workflow',
                    content: 'Transição de Workflow id ' + action.payload.transicaoWorkflowId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<TransicaoWorkflow>({
                    id: response.id,
                    schema: transicaoWorkflowSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new WorkflowListActions.DeleteTransicaoWorkflowSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.workflowId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'workflow',
                    content: 'Erro ao apagar a transição de workflow id ' + action.payload.workflowId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new WorkflowListActions.DeleteTransicaoWorkflowFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _transicaoWorkflowService: TransicaoWorkflowService,
        private _loginService: LoginService,
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

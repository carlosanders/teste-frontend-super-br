import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as WorkflowListActions from '../actions';
import {WorkflowService} from '@cdk/services/workflow.service';
import {workflow as workflowSchema} from '@cdk/normalizr/index';
import {getRouterState, State} from '../../../../../../../store';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {LoginService} from '../../../../../../auth/login/login.service';
import {Workflow} from '@cdk/models';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class WorkflowListEffects {

    routerState: any;
    /**
     * Get Workflow with router parameters
     *
     * @type {Observable<any>}
     */
    getWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<WorkflowListActions.GetWorkflow>(WorkflowListActions.GET_WORKFLOW),
        switchMap(action => this._workflowService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(['populateAll']),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<Workflow>({data: response['entities'], schema: workflowSchema}),
                new WorkflowListActions.GetWorkflowSuccess({
                    entitiesId: response['entities'].map(workflow => workflow.id),
                    loaded: {
                        id: 'workflowHandle',
                        value: this.routerState.params.workflowHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new WorkflowListActions.GetWorkflowFailed(err));
            })
        ))
    ));
    /**
     * Delete Workflow
     *
     * @type {Observable<any>}
     */
    deleteWorkflow: Observable<WorkflowListActions.WorkflowListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<WorkflowListActions.DeleteWorkflow>(WorkflowListActions.DELETE_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'workflow',
            content: 'Apagando o workflow id ' + action.payload.workflowId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._workflowService.destroy(action.payload.workflowId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'workflow',
                    content: 'Workflow id ' + action.payload.workflowId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Workflow>({
                    id: response.id,
                    schema: workflowSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new WorkflowListActions.DeleteWorkflowSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.workflowId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'workflow',
                    content: 'Erro ao apagar o workflow id ' + action.payload.workflowId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new WorkflowListActions.DeleteWorkflowFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _workflowService: WorkflowService,
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

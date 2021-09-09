import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as WorkflowDadosBasicos from '../actions/workflow-dados-basicos.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {WorkflowService} from '@cdk/services/workflow.service';
import {Workflow} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class WorkflowDadosBasicosEffects {
    routerState: any;
    /**
     * Save Workflow
     *
     * @type {Observable<any>}
     */
    saveWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<WorkflowDadosBasicos.SaveWorkflow>(WorkflowDadosBasicos.SAVE_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'workflow',
            content: 'Salvando o workflow ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._workflowService.save(action.payload.workflow, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'workflow',
                    content: 'Workflow id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Workflow) => [
                    new WorkflowDadosBasicos.SaveWorkflowSuccess(response),
                    new AddData<Workflow>({data: [response], schema: workflowSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'workflow',
                        content: 'Erro ao salvar o workflow!',
                        status: 2, // erro
                    }));
                    return of(new WorkflowDadosBasicos.SaveWorkflowFailed(err));
                })
            )
        })
    ));
    /**
     * Save Workflow Success
     */
    saveWorkflowSuccess: any = createEffect(() => this._actions.pipe(
        ofType<WorkflowDadosBasicos.SaveWorkflowSuccess>(WorkflowDadosBasicos.SAVE_WORKFLOW_SUCCESS),
        tap(() => {
            this._router.navigate(['apps/admin/workflows/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _workflowService: WorkflowService,
        private _store: Store<State>,
        private _loginService: LoginService,
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

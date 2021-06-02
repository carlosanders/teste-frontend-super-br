import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as WorkflowDadosBasicos from '../actions/workflow-dados-basicos.actions';
import * as WorkflowListActions from '../../../../workflow-list/store/actions/workflow-list.actions';

import {AddData, SetData} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {WorkflowService} from '@cdk/services/workflow.service';
import {Workflow} from '@cdk/models';

@Injectable()
export class WorkflowDadosBasicosEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _workflowService: WorkflowService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
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
     * Save Workflow
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowDadosBasicos.SaveWorkflow>(WorkflowDadosBasicos.SAVE_WORKFLOW),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._workflowService.save(action.payload, context).pipe(
                        mergeMap((response: Workflow) =>
                            [
                                new AddData<Workflow>({data: [response], schema: workflowSchema}),
                                new WorkflowDadosBasicos.SaveWorkflowSuccess(action.payload),
                            ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new WorkflowDadosBasicos.SaveWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Save Workflow Success
     */
    @Effect({dispatch: false})
    saveWorkflowSuccess: any =
        this._actions
            .pipe(
                ofType<WorkflowDadosBasicos.SaveWorkflowSuccess>(WorkflowDadosBasicos.SAVE_WORKFLOW_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/workflows/listar']).then();
                })
            );
}

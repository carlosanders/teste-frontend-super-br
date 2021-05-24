import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as WorkflowEditActions from '../actions/workflow-edit.actions';
import * as WorkflowListActions from '../../../workflow-list/store/actions/workflow-list.actions';

import {AddData, SetData} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr/index';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {WorkflowService} from '@cdk/services/workflow.service';
import {Workflow} from '@cdk/models';

@Injectable()
export class WorkflowEditEffects {
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
     * Get Workflow with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowEditActions.GetWorkflow>(WorkflowEditActions.GET_WORKFLOW),
                switchMap(action => this._workflowService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                        ]),
                        JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<Workflow>({data: response['entities'], schema: workflowSchema}),
                    new WorkflowEditActions.GetWorkflowSuccess({
                        loaded: {
                            id: 'workflowHandle',
                            value: this.routerState.params.workflowHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new WorkflowEditActions.GetWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Save Workflow
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowEditActions.SaveWorkflow>(WorkflowEditActions.SAVE_WORKFLOW),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._workflowService.save(action.payload, context).pipe(
                        mergeMap((response: Workflow) =>
                            [
                                new AddData<Workflow>({data: [response], schema: workflowSchema}),
                                new WorkflowListActions.GetWorkflow(action.payload),
                                new WorkflowEditActions.SaveWorkflowSuccess(action.payload),
                            ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new WorkflowEditActions.SaveWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Update Workflow
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowEditActions.UpdateWorkflow>(WorkflowEditActions.UPDATE_WORKFLOW),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._workflowService.save(action.payload).pipe(
                        mergeMap((response: Workflow) => [
                                new SetData<Workflow>({data: [response], schema: workflowSchema}),
                                new WorkflowEditActions.ReloadWorkflow(action.payload),
                                new WorkflowEditActions.UpdateWorkflowSuccess(response)
                            ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new WorkflowEditActions.UpdateWorkflowFailed(err));
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
                ofType<WorkflowEditActions.SaveWorkflowSuccess>(WorkflowEditActions.SAVE_WORKFLOW_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/workflows/listar']).then();
                })
            );

    /**
     * Save Workflow Success
     */
    @Effect({dispatch: false})
    updateWorkflowSuccess: any =
        this._actions
            .pipe(
                ofType<WorkflowEditActions.UpdateWorkflowSuccess>(WorkflowEditActions.UPDATE_WORKFLOW_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/workflows/listar']).then();
                })
            );


    /**
     * Get Workflow with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    reloadWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowEditActions.ReloadWorkflow>(WorkflowEditActions.RELOAD_WORKFLOW),
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
                            new SetData<Workflow>({data: response['entities'], schema: workflowSchema}),
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
            );


}

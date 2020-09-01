import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import * as WorkflowListActions from '../actions';
import {WorkflowService} from '../../../../../../../../@cdk/services/workflow.service';
import {workflow as workflowSchema} from '../../../../../../../../@cdk/normalizr/index';
import {getRouterState, State} from '../../../../../../../store/reducers';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {LoginService} from '../../../../../../auth/login/login.service';
import {Workflow} from '../../../../../../../../@cdk/models';


@Injectable()
export class WorkflowListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _workflowService: WorkflowService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Workflow with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowListActions.GetWorkflow>(WorkflowListActions.GET_WORKFLOW),
                switchMap((action) => {
                    return this._workflowService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(['populateAll']),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
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
                    );
                })
            );

    /**
     * Delete Workflow
     * @type {Observable<any>}
     */
    @Effect()
    deleteWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowListActions.DeleteWorkflow>(WorkflowListActions.DELETE_WORKFLOW),
                mergeMap((action) => {
                    return this._workflowService.destroy(action.payload).pipe(
                        map((response) => new WorkflowListActions.DeleteWorkflowSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new WorkflowListActions.DeleteWorkflowFailed(action.payload));
                        })
                    );
                })
            );
}

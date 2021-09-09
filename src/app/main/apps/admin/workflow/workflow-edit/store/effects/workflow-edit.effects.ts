import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as WorkflowEditActions from '../actions/workflow-edit.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {workflow as workflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {WorkflowService} from '@cdk/services/workflow.service';
import {Workflow} from '@cdk/models';

@Injectable()
export class WorkflowEditEffects {
    routerState: any;
    /**
     * Get Workflow with router parameters
     *
     * @type {Observable<any>}
     */
    getWorkflow: any = createEffect(() => this._actions.pipe(
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
                entityId: this.routerState.params.workflowHandle
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new WorkflowEditActions.GetWorkflowFailed(err));
        })
    ));

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

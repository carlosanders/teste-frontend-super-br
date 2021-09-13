import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

import * as WorkflowViewActions from '../actions/workflow-view.actions';

import {WorkflowService} from '@cdk/services/workflow.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class WorkflowViewEffect {
    routerState: any;
    /**
     * Set visualizarTransicoesWorkflow
     *
     * @type {Observable<any>}
     */
    visualizarTransicoesWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<WorkflowViewActions.GetWorkflowViewTransicoes>(WorkflowViewActions.GET_WORKFLOW_VIEW_TRANSICOES),
        switchMap(action => this._workflowService.workflowViewTransicoesAction(action.payload)),
        tap(response => this._store.dispatch(new WorkflowViewActions.GetWorkflowViewTransicoesSuccess({
            loaded: {
                id: 'workflowHandle',
                value: this.routerState.params.workflowHandle,
                componenteDigital: response
            }
        }))),
        catchError((err) => {
            console.log(err);
            return of(new WorkflowViewActions.GetWorkflowViewTransicoesFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _workflowService: WorkflowService,
        private _store: Store<State>,
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

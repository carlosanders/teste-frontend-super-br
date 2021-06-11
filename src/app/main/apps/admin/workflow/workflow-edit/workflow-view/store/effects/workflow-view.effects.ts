import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import * as WorkflowViewActions from '../actions/workflow-view.actions';

import {WorkflowService} from '@cdk/services/workflow.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class WorkflowViewEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _workflowService: WorkflowService,
        private _store: Store<State>,
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
     * Set visualizarTransicoesWorkflow
     *
     * @type {Observable<any>}
     */
    @Effect({ dispatch: false })
    visualizarTransicoesWorkflow: any =
        this._actions
            .pipe(
                ofType<WorkflowViewActions.GetWorkflowViewTransicoes>(WorkflowViewActions.GET_WORKFLOW_VIEW_TRANSICOES),
                switchMap(action => this._workflowService.workflowViewTransicoesAction(action.payload)),
                tap((response) => {
                    this._store.dispatch(new WorkflowViewActions.GetWorkflowViewTransicoesSuccess({
                        loaded: {
                            id: 'workflowHandle',
                            value: this.routerState.params.workflowHandle,
                            componenteDigital: response
                        }
                    }));
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new WorkflowViewActions.GetWorkflowViewTransicoesFailed(err));
                    return caught;
                })
            );
}

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import * as WorkflowListActions from '../actions';
import {TransicaoWorkflowService} from '../../../../../../../../../@cdk/services/transicao-workflow.service';
import {transicaoWorkflow as transicaoWorkflowSchema} from '../../../../../../../../../@cdk/normalizr';
import {getRouterState, State} from '../../../../../../../../store/reducers';
import {AddData} from '../../../../../../../../../@cdk/ngrx-normalizr';
import {LoginService} from '../../../../../../../auth/login/login.service';
import {Workflow} from '../../../../../../../../../@cdk/models';
import {CdkUtils} from "../../../../../../../../../@cdk/utils";


@Injectable()
export class TransicaoWorkflowListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _transicaoWorkflowService: TransicaoWorkflowService,
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
                ofType<WorkflowListActions.GetTransicaoWorkflow>(WorkflowListActions.GET_TRANSICAO_WORKFLOW),
                switchMap((action) => {
                    return this._transicaoWorkflowService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<Workflow>({data: response['entities'], schema: transicaoWorkflowSchema}),
                            new WorkflowListActions.GetTransicaoWorkflowSuccess({
                                entitiesId: response['entities'].map(transicaoWorkflow => transicaoWorkflow.id),
                                loaded: {
                                    id: 'transicaoWorkflowHandle',
                                    value: this.routerState.params.transicaoWorkflowHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new WorkflowListActions.GetTransicaoWorkflowFailed(err));
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
                ofType<WorkflowListActions.DeleteTransicaoWorkflow>(WorkflowListActions.DELETE_TRANSICAO_WORKFLOW),
                mergeMap((action) => {
                    return this._transicaoWorkflowService.destroy(action.payload).pipe(
                        map((response) => new WorkflowListActions.DeleteTransicaoWorkflowSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new WorkflowListActions.DeleteTransicaoWorkflowFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}

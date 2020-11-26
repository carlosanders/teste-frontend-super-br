import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TransicaoWorkflowEditActions from '../actions/transicao-workflow-edit.actions';
import * as TransicaoWorkflowListActions
    from '../../../transicao-workflow-list/store/actions/transicao-workflow-list.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {TransicaoWorkflowService} from '../../../../../../../../../@cdk/services/transicao-workflow.service';
import {Workflow} from '../../../../../../../../../@cdk/models';

@Injectable()
export class TransicaoWorkflowEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _transicaoWorkflowService: TransicaoWorkflowService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
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
                ofType<TransicaoWorkflowEditActions.GetTransicaoWorkflow>(TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW),
                switchMap((action) => {
                    return this._transicaoWorkflowService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<Workflow>({data: response['entities'], schema: transicaoWorkflowSchema}),
                    new TransicaoWorkflowEditActions.GetTransicaoWorkflowSuccess({
                        loaded: {
                            id: 'transicaoWorkflowHandle',
                            value: this.routerState.params.transicaoWorkflowHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TransicaoWorkflowEditActions.GetTransicaoWorkflowFailed(err));
                    return caught;
                })
            );

    /**
     * Save Workflow
     * @type {Observable<any>}
     */
    @Effect()
    saveWorkflow: any =
        this._actions
            .pipe(
                ofType<TransicaoWorkflowEditActions.SaveTransicaoWorkflow>(TransicaoWorkflowEditActions.SAVE_TRANSICAO_WORKFLOW),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._transicaoWorkflowService.save(action.payload, context).pipe(
                        mergeMap((response: Workflow) =>
                            [
                                new AddData<Workflow>({data: [response], schema: transicaoWorkflowSchema}),
                                new TransicaoWorkflowListActions.GetTransicaoWorkflow(action.payload),
                                new TransicaoWorkflowEditActions.SaveTransicaoWorkflowSuccess(action.payload),
                            ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TransicaoWorkflowEditActions.SaveTransicaoWorkflowFailed(err));
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
                ofType<TransicaoWorkflowEditActions.SaveTransicaoWorkflowSuccess>(TransicaoWorkflowEditActions.SAVE_TRANSICAO_WORKFLOW_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/workflows/' + action.payload.workflow.id + '/transicoes/listar']).then();
                })
            );


}

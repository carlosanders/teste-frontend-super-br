import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as TransicaoWorkflowEditActions from '../actions/transicao-workflow-edit.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';
import {TransicaoWorkflow} from '@cdk/models';

@Injectable()
export class TransicaoWorkflowEditEffects {
    routerState: any;
    /**
     * Get Workflow with router parameters
     *
     * @type {Observable<any>}
     */
    getWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TransicaoWorkflowEditActions.GetTransicaoWorkflow>(TransicaoWorkflowEditActions.GET_TRANSICAO_WORKFLOW),
        switchMap(action => this._transicaoWorkflowService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<TransicaoWorkflow>({data: response['entities'], schema: transicaoWorkflowSchema}),
            new TransicaoWorkflowEditActions.GetTransicaoWorkflowSuccess({
                loaded: {
                    id: 'transicaoWorkflowHandle',
                    value: this.routerState.params.transicaoWorkflowHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TransicaoWorkflowEditActions.GetTransicaoWorkflowFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _transicaoWorkflowService: TransicaoWorkflowService,
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

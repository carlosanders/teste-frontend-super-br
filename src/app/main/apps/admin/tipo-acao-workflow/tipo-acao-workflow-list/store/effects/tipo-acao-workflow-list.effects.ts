import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as TipoAcaoWorkflowListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';


@Injectable()
export class TipoAcaoWorkflowListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService,
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
     * Get TipoAcaoWorkflow with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTipoAcaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoAcaoWorkflowListActions.GetTipoAcaoWorkflow>(TipoAcaoWorkflowListActions.GET_TIPO_ACAO_WORKFLOW),
                switchMap((action) => {
                    return this._tipoAcaoWorkflowService.query(
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
                            new AddData<TipoAcaoWorkflow>({data: response['entities'], schema: tipoAcaoWorkflowSchema}),
                            new TipoAcaoWorkflowListActions.GetTipoAcaoWorkflowSuccess({
                                entitiesId: response['entities'].map(tipoAcaoWorkflow => tipoAcaoWorkflow.id),
                                loaded: {
                                    id: 'tipoAcaoWorkflowHandle',
                                    value: this.routerState.params.tipoAcaoWorkflowHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoAcaoWorkflowListActions.GetTipoAcaoWorkflowFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete TipoAcaoWorkflow
     * @type {Observable<any>}
     */
    @Effect()
    deleteTipoAcaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoAcaoWorkflowListActions.DeleteTipoAcaoWorkflow>(TipoAcaoWorkflowListActions.DELETE_TIPO_ACAO_WORKFLOW),
                mergeMap((action) => {
                    return this._tipoAcaoWorkflowService.destroy(action.payload).pipe(
                        map((response) => new TipoAcaoWorkflowListActions.DeleteTipoAcaoWorkflowSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoAcaoWorkflowListActions.DeleteTipoAcaoWorkflowFailed(action.payload));
                        })
                    );
                })
            );
}

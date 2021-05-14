import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as TipoValidacaoWorkflowListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoValidacaoWorkflowService} from '../../../../../../../../@cdk/services/tipo-validacao-workflow.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {TipoValidacaoWorkflow} from '../../../../../../../../@cdk/models';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '../../../../../../../../@cdk/normalizr';
import {CdkUtils} from "../../../../../../../../@cdk/utils";


@Injectable()
export class TipoValidacaoWorkflowListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoValidacaoWorkflowService: TipoValidacaoWorkflowService,
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
     * Get TipoValidacaoWorkflow with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getTipoValidacaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoValidacaoWorkflowListActions.GetTipoValidacaoWorkflow>(TipoValidacaoWorkflowListActions.GET_TIPO_VALIDACAO_WORKFLOW),
                switchMap((action) => {
                    return this._tipoValidacaoWorkflowService.query(
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
                            new AddData<TipoValidacaoWorkflow>({data: response['entities'], schema: tipoValidacaoWorkflowSchema}),
                            new TipoValidacaoWorkflowListActions.GetTipoValidacaoWorkflowSuccess({
                                entitiesId: response['entities'].map(tipoValidacaoWorkflow => tipoValidacaoWorkflow.id),
                                loaded: {
                                    id: 'tipoValidacaoWorkflowHandle',
                                    value: this.routerState.params.tipoValidacaoWorkflowHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoValidacaoWorkflowListActions.GetTipoValidacaoWorkflowFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete TipoValidacaoWorkflow
     * @type {Observable<any>}
     */
    @Effect()
    deleteTipoValidacaoWorkflow: any =
        this._actions
            .pipe(
                ofType<TipoValidacaoWorkflowListActions.DeleteTipoValidacaoWorkflow>(TipoValidacaoWorkflowListActions.DELETE_TIPO_VALIDACAO_WORKFLOW),
                mergeMap((action) => {
                    return this._tipoValidacaoWorkflowService.destroy(action.payload).pipe(
                        map((response) => new TipoValidacaoWorkflowListActions.DeleteTipoValidacaoWorkflowSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoValidacaoWorkflowListActions.DeleteTipoValidacaoWorkflowFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}

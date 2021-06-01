import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AcaoListActions from '../actions/acao-transicao-workflow-list.actions';
import {AcaoTransicaoWorkflowService} from '@cdk/services/acao-transicao-workflow.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';
import {acaoTransicaoWorkflow as acaoTransicaoWorkflowSchema} from '@cdk/normalizr';
import {CdkUtils} from '../../../../../../../../../../../../@cdk/utils';

@Injectable()
export class AcaoTransicaoWorkflowListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _acaoTransicaoWorkflowService: AcaoTransicaoWorkflowService,
        private _store: Store<State>
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
     * Get Acoes with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAcoes: any =
        this._actions
            .pipe(
                ofType<AcaoListActions.GetAcoes>(AcaoListActions.GET_ACOES),
                switchMap(action => this._acaoTransicaoWorkflowService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap(response => [
                            new AddData<AcaoTransicaoWorkflow>({data: response['entities'], schema: acaoTransicaoWorkflowSchema}),
                            new AcaoListActions.GetAcoesSuccess({
                                entitiesId: response['entities'].map(acao => acao.id),
                                loaded: {
                                    id: 'transicaoWorkflowHandle',
                                    value: this.routerState.params.transicaoWorkflowHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError(err => of(new AcaoListActions.GetAcoesFailed(err)))
                    ))
            );

    /**
     * Delete Acao
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteAcao: any =
        this._actions
            .pipe(
                ofType<AcaoListActions.DeleteAcao>(AcaoListActions.DELETE_ACAO),
                mergeMap(action => this._acaoTransicaoWorkflowService.destroy(action.payload).pipe(
                        map(response => new AcaoListActions.DeleteAcaoSuccess(response.id)),
                        catchError(err => of(new AcaoListActions.DeleteAcaoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            ))
                    ))
            );
}

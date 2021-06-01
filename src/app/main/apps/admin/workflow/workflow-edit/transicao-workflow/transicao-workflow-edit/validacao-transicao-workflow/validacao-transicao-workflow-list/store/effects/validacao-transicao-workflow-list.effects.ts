import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ValidacaoListActions from '../actions/validacao-transicao-workflow-list.actions';
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {validacaoTransicaoWorkflow as validacaoTransicaoWorkflowSchema} from '@cdk/normalizr';
import {CdkUtils} from '../../../../../../../../../../../../@cdk/utils';

@Injectable()
export class ValidacaoTransicaoWorkflowListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _validacaoTransicaoWorkflowService: ValidacaoTransicaoWorkflowService,
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
     * Get Validacoes with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getValidacoes: any =
        this._actions
            .pipe(
                ofType<ValidacaoListActions.GetValidacoes>(ValidacaoListActions.GET_VALIDACOES),
                switchMap(action => this._validacaoTransicaoWorkflowService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap(response => [
                            new AddData<ValidacaoTransicaoWorkflow>({data: response['entities'], schema: validacaoTransicaoWorkflowSchema}),
                            new ValidacaoListActions.GetValidacoesSuccess({
                                entitiesId: response['entities'].map(validacao => validacao.id),
                                loaded: {
                                    id: 'transicaoWorkflowHandle',
                                    value: this.routerState.params.transicaoWorkflowHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError(err => of(new ValidacaoListActions.GetValidacoesFailed(err)))
                    ))
            );

    /**
     * Delete Validacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteValidacao: any =
        this._actions
            .pipe(
                ofType<ValidacaoListActions.DeleteValidacao>(ValidacaoListActions.DELETE_VALIDACAO),
                mergeMap(action => this._validacaoTransicaoWorkflowService.destroy(action.payload).pipe(
                        map(response => new ValidacaoListActions.DeleteValidacaoSuccess(response.id)),
                        catchError(err => of(new ValidacaoListActions.DeleteValidacaoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            ))
                    ))
            );
}

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ValidacaoListActions from '../actions/validacao-transicao-workflow-list.actions';
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {validacaoTransicaoWorkflow as validacaoTransicaoWorkflowSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class ValidacaoTransicaoWorkflowListEffects {

    routerState: any;
    /**
     * Get Validacoes with router parameters
     *
     * @type {Observable<any>}
     */
    getValidacoes: Observable<any> = createEffect(() => this._actions.pipe(
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
                new AddData<ValidacaoTransicaoWorkflow>({
                    data: response['entities'],
                    schema: validacaoTransicaoWorkflowSchema
                }),
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
    ));
    /**
     * Delete Validacao
     *
     * @type {Observable<any>}
     */
    deleteValidacao: Observable<ValidacaoListActions.ValidacaoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ValidacaoListActions.DeleteValidacao>(ValidacaoListActions.DELETE_VALIDACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'validação',
            content: 'Apagando a validação id ' + action.payload.validacaoTransicaoWorkflowId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._validacaoTransicaoWorkflowService.destroy(action.payload.validacaoTransicaoWorkflowId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'validação',
                    content: 'Validação id ' + action.payload.validacaoTransicaoWorkflowId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<ValidacaoTransicaoWorkflow>({
                    id: response.id,
                    schema: validacaoTransicaoWorkflowSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new ValidacaoListActions.DeleteValidacaoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.validacaoTransicaoWorkflowId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'validação',
                    content: 'Erro ao apagar a validação id ' + action.payload.validacaoTransicaoWorkflowId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ValidacaoListActions.DeleteValidacaoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _validacaoTransicaoWorkflowService: ValidacaoTransicaoWorkflowService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

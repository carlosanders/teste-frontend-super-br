import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as TipoValidacaoWorkflowListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TipoValidacaoWorkflowListEffects {
    routerState: any;
    /**
     * Get TipoValidacaoWorkflow with router parameters
     *
     * @type {Observable<any>}
     */
    getTipoValidacaoWorkflow: any = createEffect(() => this._actions.pipe(
        ofType<TipoValidacaoWorkflowListActions.GetTipoValidacaoWorkflow>(TipoValidacaoWorkflowListActions.GET_TIPO_VALIDACAO_WORKFLOW),
        switchMap(action => this._tipoValidacaoWorkflowService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<TipoValidacaoWorkflow>({
                    data: response['entities'],
                    schema: tipoValidacaoWorkflowSchema
                }),
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
        ))
    ));
    /**
     * Delete TipoValidacaoWorkflow
     *
     * @type {Observable<any>}
     */
    deleteTipoValidacaoWorkflow: Observable<TipoValidacaoWorkflowListActions.TipoValidacaoWorkflowListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TipoValidacaoWorkflowListActions.DeleteTipoValidacaoWorkflow>(TipoValidacaoWorkflowListActions.DELETE_TIPO_VALIDACAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tipo validação workflow',
            content: 'Apagando tipo validação workflow id ' + action.payload.tipoValidacaoWorkflowId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tipoValidacaoWorkflowService.destroy(action.payload.tipoValidacaoWorkflowId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo validação workflow',
                    content: 'Tipo validação workflow id ' + action.payload.tipoValidacaoWorkflowId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<TipoValidacaoWorkflow>({
                    id: response.id,
                    schema: tipoValidacaoWorkflowSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new TipoValidacaoWorkflowListActions.DeleteTipoValidacaoWorkflowSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.tipoValidacaoWorkflowId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo validação workflow',
                    content: 'Erro ao apagar tipo validação workflow id ' + action.payload.tipoValidacaoWorkflowId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new TipoValidacaoWorkflowListActions.DeleteTipoValidacaoWorkflowFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _tipoValidacaoWorkflowService: TipoValidacaoWorkflowService,
        private _loginService: LoginService,
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

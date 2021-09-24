import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as TipoAcaoWorkflowListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TipoAcaoWorkflowListEffects {
    routerState: any;
    /**
     * Get TipoAcaoWorkflow with router parameters
     *
     * @type {Observable<any>}
     */
    getTipoAcaoWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TipoAcaoWorkflowListActions.GetTipoAcaoWorkflow>(TipoAcaoWorkflowListActions.GET_TIPO_ACAO_WORKFLOW),
        switchMap(action => this._tipoAcaoWorkflowService.query(
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
        ))
    ));
    /**
     * Delete TipoAcaoWorkflow
     *
     * @type {Observable<any>}
     */
    deleteTipoAcaoWorkflow: Observable<TipoAcaoWorkflowListActions.TipoAcaoWorkflowListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TipoAcaoWorkflowListActions.DeleteTipoAcaoWorkflow>(TipoAcaoWorkflowListActions.DELETE_TIPO_ACAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tipo ação workflow',
            content: 'Apagando o tipo ação workflow id ' + action.payload.tipoAcaoWorkflowId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tipoAcaoWorkflowService.destroy(action.payload.tipoAcaoWorkflowId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo ação workflow',
                    content: 'Tipo ação workflow id ' + action.payload.tipoAcaoWorkflowId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<TipoAcaoWorkflow>({
                    id: response.id,
                    schema: tipoAcaoWorkflowSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new TipoAcaoWorkflowListActions.DeleteTipoAcaoWorkflowSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.tipoAcaoWorkflowId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo ação workflow',
                    content: 'Erro ao apagar o tipo ação workflow id ' + action.payload.tipoAcaoWorkflowId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new TipoAcaoWorkflowListActions.DeleteTipoAcaoWorkflowFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _tipoAcaoWorkflowService: TipoAcaoWorkflowService,
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

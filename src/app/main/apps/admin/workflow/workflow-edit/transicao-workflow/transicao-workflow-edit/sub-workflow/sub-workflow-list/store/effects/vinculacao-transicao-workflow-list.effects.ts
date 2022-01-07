import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {vinculacaoTransicaoWorkflow as vinculacaoTransicaoWorkflowSchema} from '@cdk/normalizr';
import {getRouterState, State} from 'app/store';
import {AddData, RemoveData} from '@cdk/ngrx-normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {VinculacaoTransicaoWorkflow} from '@cdk/models';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../index';
import {
    VinculacaoTransicaoWorkflowService
} from '@cdk/services/vinculacao-transicao-workflow.service';

@Injectable()
export class VinculacaoTransicaoWorkflowListEffects {

    routerState: any;
    
    getVinculacaoTransicaoWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.GetVinculacaoTransicaoWorkflow>(fromStore.GET_VINCULACAO_TRANSICAO_WORKFLOW),
        switchMap(action => this._vinculacaoTransicaoWorkflowService.query(
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
                new AddData<VinculacaoTransicaoWorkflow>({data: response['entities'], schema: vinculacaoTransicaoWorkflowSchema}),
                new fromStore.GetVinculacaoTransicaoWorkflowSuccess({
                    entitiesId: response['entities'].map(vinculacaoTransicaoWorkflow => vinculacaoTransicaoWorkflow.id),
                    loaded: {
                        id: 'transicaoWorkflowHandle',
                        value: this.routerState.params['transicaoWorkflowHandle']
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new fromStore.GetVinculacaoTransicaoWorkflowFailed(err));
            })
        ))
    ));

    deleteVinculacaoTransicaoWorkflow: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeleteVinculacaoTransicaoWorkflow>(fromStore.DELETE_VINCULACAO_TRANSICAO_WORKFLOW),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação transição workflow',
            content: 'Apagando a vinculação da transição de workflow id ' + action.payload.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoTransicaoWorkflowService.destroy(action.payload.id).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação transição workflow',
                    content: 'Vinculação da transição de Workflow id ' + action.payload.id + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                return new fromStore.DeleteVinculacaoTransicaoWorkflowSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.workflowId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação transição workflow',
                    content: 'Erro ao apagar a vinculação da transição de workflow id ' + action.payload.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new fromStore.DeleteVinculacaoTransicaoWorkflowFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoTransicaoWorkflowService: VinculacaoTransicaoWorkflowService,
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

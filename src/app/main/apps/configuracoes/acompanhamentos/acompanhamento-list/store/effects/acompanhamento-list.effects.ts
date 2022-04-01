import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AcompanhamentoListActions from '../actions';

import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AcompanhamentoListEffect {
    routerState: any;
    /**
     * Get Acompanhamentos with router parameters
     *
     * @type {Observable<any>}
     */
    getAcompanhamentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AcompanhamentoListActions.GetAcompanhamentos>(AcompanhamentoListActions.GET_ACOMPANHAMENTOS),
        switchMap(action => this._acompanhamentoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => {
                response['entities'].forEach((compartilhamento: Compartilhamento) => this._store.dispatch(new AcompanhamentoListActions.GetEtiquetasProcesso(compartilhamento.processo.id)));
                return [
                    new AddData<Compartilhamento>({
                        data: response['entities'],
                        schema: acompanhamentoSchema
                    }),
                    new AcompanhamentoListActions.GetAcompanhamentosSuccess({
                        entitiesId: response['entities'].map(acompanhamento => acompanhamento.id),
                        loaded: {
                            id: 'usuarioHandle',
                            value: this._loginService.getUserProfile().id
                        },
                        total: response['total']
                    })
                ];
            }),
            catchError((err) => {
                console.log(err);
                return of(new AcompanhamentoListActions.GetAcompanhamentosFailed(err));
            })
        ))
    ));
    /**
     * Delete Acompanhamento
     *
     * @type {Observable<any>}
     */
    deleteAcompanhamento: Observable<AcompanhamentoListActions.AcompanhamentoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AcompanhamentoListActions.DeleteAcompanhamento>(AcompanhamentoListActions.DELETE_ACOMPANHAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'acompanhamento',
            content: 'Apagando o acompanhamento id ' + action.payload.acompanhamentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._acompanhamentoService.destroy(action.payload.acompanhamentoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'acompanhamento',
                    content: 'Acompanhamento id ' + action.payload.acompanhamentoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Compartilhamento>({
                    id: response.id,
                    schema: acompanhamentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new AcompanhamentoListActions.DeleteAcompanhamentoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.acompanhamentoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'acompanhamento',
                    content: 'Erro ao apagar o acompanhamento id ' + action.payload.acompanhamentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AcompanhamentoListActions.DeleteAcompanhamentoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _acompanhamentoService: AcompanhamentoService,
        public _loginService: LoginService,
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

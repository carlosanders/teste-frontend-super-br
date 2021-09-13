import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TransicaoListActions from '../actions';

import {TransicaoService} from '@cdk/services/transicao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Transicao} from '@cdk/models';
import {transicao as transicaoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TransicaoListEffect {
    routerState: any;

    /**
     * Get Transicoes with router parameters
     *
     * @type {Observable<any>}
     */
    getTransicoes: any = createEffect(() => this._actions.pipe(
        ofType<TransicaoListActions.GetTransicoes>(TransicaoListActions.GET_TRANSICOES),
        switchMap(action => this._transicaoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Transicao>({data: response['entities'], schema: transicaoSchema}),
            new TransicaoListActions.GetTransicoesSuccess({
                entitiesId: response['entities'].map(transicao => transicao.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TransicaoListActions.GetTransicoesFailed(err));
        })
    ));

    /**
     * Delete Transicao
     *
     * @type {Observable<any>}
     */
    deleteTransicao: Observable<TransicaoListActions.TransicaoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TransicaoListActions.DeleteTransicao>(TransicaoListActions.DELETE_TRANSICAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'transição',
            content: 'Apagando a transição id ' + action.payload.transicaoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._transicaoService.destroy(action.payload.transicaoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'transição',
                    content: 'Transição id ' + action.payload.transicaoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Transicao>({
                    id: response.id,
                    schema: transicaoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new TransicaoListActions.DeleteTransicaoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.transicaoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'transição',
                    content: 'Erro ao apagar a transição id ' + action.payload.transicaoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new TransicaoListActions.DeleteTransicaoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _transicaoService: TransicaoService,
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

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoPessoaBarramentoListActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaBarramento as vinculacaoPessoaBarramentoSchema} from '@cdk/normalizr/index';
import {VinculacaoPessoaBarramentoService} from '@cdk/services/vinculacao-pessoa-barramento.service';
import {VinculacaoPessoaBarramento} from '@cdk/models/vinculacao-pessoa-barramento';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VinculacaoPessoaBarramentoListEffect {
    routerState: any;
    /**
     * Get VinculacaoPessoaBarramentos with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacaoPessoaBarramentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaBarramentoListActions.GetVinculacaoPessoaBarramentos>(VinculacaoPessoaBarramentoListActions.GET_VINCULACAO_PESSOA_BARRAMENTOS),
        switchMap(action => this._vinculacaoPessoaBarramentoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify([
                'populateAll'
            ]))),
        mergeMap(response => [
            new AddData<VinculacaoPessoaBarramento>({
                data: response['entities'],
                schema: vinculacaoPessoaBarramentoSchema
            }),
            new VinculacaoPessoaBarramentoListActions.GetVinculacaoPessoaBarramentosSuccess({
                entitiesId: response['entities'].map(vinculacaoPessoaBarramento => vinculacaoPessoaBarramento.id),
                loaded: {
                    id: 'pessoaHandle',
                    value: this.routerState.params.pessoaHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VinculacaoPessoaBarramentoListActions.GetVinculacaoPessoaBarramentosFailed(err));
        })
    ));
    /**
     * Delete VinculacaoPessoaBarramento
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoPessoaBarramento: Observable<VinculacaoPessoaBarramentoListActions.VinculacaoPessoaBarramentoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaBarramentoListActions.DeleteVinculacaoPessoaBarramento>(VinculacaoPessoaBarramentoListActions.DELETE_VINCULACAO_PESSOA_BARRAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculacaoPessoaBarramento',
            content: 'Apagando a vinculacaoPessoaBarramento id ' + action.payload.vinculacaoPessoaBarramentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoPessoaBarramentoService.destroy(action.payload.vinculacaoPessoaBarramentoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculacaoPessoaBarramento',
                    content: 'VinculacaoPessoaBarramento id ' + action.payload.vinculacaoPessoaBarramentoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<VinculacaoPessoaBarramento>({
                    id: response.id,
                    schema: vinculacaoPessoaBarramentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new VinculacaoPessoaBarramentoListActions.DeleteVinculacaoPessoaBarramentoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoPessoaBarramentoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculacaoPessoaBarramento',
                    content: 'Erro ao apagar a vinculacaoPessoaBarramento id ' + action.payload.vinculacaoPessoaBarramentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new VinculacaoPessoaBarramentoListActions.DeleteVinculacaoPessoaBarramentoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaBarramentoService: VinculacaoPessoaBarramentoService,
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

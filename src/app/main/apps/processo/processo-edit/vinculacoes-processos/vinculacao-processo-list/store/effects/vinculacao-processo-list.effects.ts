import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoProcessoListActions from '../actions';

import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VinculacaoProcessoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
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
     * Get VinculacoesProcessos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacoesProcessos: any =
        this._actions
            .pipe(
                ofType<VinculacaoProcessoListActions.GetVinculacoesProcessos>(VinculacaoProcessoListActions.GET_VINCULACOES_PROCESSOS),
                switchMap(action => this._vinculacaoProcessoService.query(
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
                    new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
                    new VinculacaoProcessoListActions.GetVinculacoesProcessosSuccess({
                        entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoProcessoListActions.GetVinculacoesProcessosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete VinculacaoProcesso
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoProcesso: Observable<VinculacaoProcessoListActions.VinculacaoProcessoListActionsAll> =
        this._actions
            .pipe(
                ofType<VinculacaoProcessoListActions.DeleteVinculacaoProcesso>(VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculacaoProcesso',
                        content: 'Apagando a vinculacaoProcesso id ' + action.payload.vinculacaoProcessoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._vinculacaoProcessoService.destroy(action.payload.vinculacaoProcessoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculacaoProcesso',
                                content: 'VinculacaoProcesso id ' + action.payload.vinculacaoProcessoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<VinculacaoProcesso>({
                                id: response.id,
                                schema: vinculacaoProcessoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new VinculacaoProcessoListActions.DeleteVinculacaoProcessoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.vinculacaoProcessoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'vinculacaoProcesso',
                                content: 'Erro ao apagar a vinculacaoProcesso id ' + action.payload.vinculacaoProcessoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new VinculacaoProcessoListActions.DeleteVinculacaoProcessoFailed(payload));
                        })
                    );
                }, 25)
            );
}

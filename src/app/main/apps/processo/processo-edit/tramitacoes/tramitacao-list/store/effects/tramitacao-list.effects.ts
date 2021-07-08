import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TramitacaoListActions from '../actions';

import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Tramitacao} from '@cdk/models';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TramitacaoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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
     * Get Tramitacoes with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTramitacoes: any =
        this._actions
            .pipe(
                ofType<TramitacaoListActions.GetTramitacoes>(TramitacaoListActions.GET_TRAMITACOES),
                switchMap(action => this._tramitacaoService.query(
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
                    new AddData<Tramitacao>({data: response['entities'], schema: tramitacaoSchema}),
                    new TramitacaoListActions.GetTramitacoesSuccess({
                        entitiesId: response['entities'].map(tramitacao => tramitacao.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new TramitacaoListActions.GetTramitacoesFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Tramitacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteTramitacao: Observable<TramitacaoListActions.TramitacaoListActionsAll> =
        this._actions
            .pipe(
                ofType<TramitacaoListActions.DeleteTramitacao>(TramitacaoListActions.DELETE_TRAMITACAO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tramitacao',
                        content: 'Apagando a tramitacao id ' + action.payload.tramitacaoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._tramitacaoService.destroy(action.payload.tramitacaoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tramitacao',
                                content: 'Tramitacao id ' + action.payload.tramitacaoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Tramitacao>({
                                id: response.id,
                                schema: tramitacaoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new TramitacaoListActions.DeleteTramitacaoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.tramitacaoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tramitacao',
                                content: 'Erro ao apagar a tramitacao id ' + action.payload.tramitacaoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new TramitacaoListActions.DeleteTramitacaoFailed(payload));
                        })
                    );
                }, 25)
            );
}

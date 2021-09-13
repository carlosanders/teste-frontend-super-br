import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Get Tramitacoes with router parameters
     *
     * @type {Observable<any>}
     */
    getTramitacoes: any = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new TramitacaoListActions.GetTramitacoesFailed(err));
        })
    ));
    /**
     * Delete Tramitacao
     *
     * @type {Observable<any>}
     */
    deleteTramitacao: Observable<TramitacaoListActions.TramitacaoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TramitacaoListActions.DeleteTramitacao>(TramitacaoListActions.DELETE_TRAMITACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tramitação',
            content: 'Apagando a tramitação id ' + action.payload.tramitacaoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tramitacaoService.destroy(action.payload.tramitacaoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tramitação',
                    content: 'Tramitação id ' + action.payload.tramitacaoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Tramitacao>({
                    id: response.id,
                    schema: tramitacaoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new TramitacaoListActions.DeleteTramitacaoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.tramitacaoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tramitação',
                    content: 'Erro ao apagar a tramitação id ' + action.payload.tramitacaoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new TramitacaoListActions.DeleteTramitacaoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _tramitacaoService: TramitacaoService,
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

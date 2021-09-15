import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RelevanciaListActions from '../actions';

import {RelevanciaService} from '@cdk/services/relevancia.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Relevancia} from '@cdk/models';
import {relevancia as relevanciaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class RelevanciaListEffect {
    routerState: any;
    /**
     * Get Relevancias with router parameters
     *
     * @type {Observable<any>}
     */
    getRelevancias: any = createEffect(() => this._actions.pipe(
        ofType<RelevanciaListActions.GetRelevancias>(RelevanciaListActions.GET_RELEVANCIAS),
        switchMap(action => this._relevanciaService.query(
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
            new AddData<Relevancia>({data: response['entities'], schema: relevanciaSchema}),
            new RelevanciaListActions.GetRelevanciasSuccess({
                entitiesId: response['entities'].map(relevancia => relevancia.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RelevanciaListActions.GetRelevanciasFailed(err));
        })
    ));
    /**
     * Delete Relevancia
     *
     * @type {Observable<any>}
     */
    deleteRelevancia: Observable<RelevanciaListActions.RelevanciaListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RelevanciaListActions.DeleteRelevancia>(RelevanciaListActions.DELETE_RELEVANCIA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'relevância',
            content: 'Apagando a relevância id ' + action.payload.relevanciaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._relevanciaService.destroy(action.payload.relevanciaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relevância',
                    content: 'Relevância id ' + action.payload.relevanciaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Relevancia>({
                    id: response.id,
                    schema: relevanciaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RelevanciaListActions.DeleteRelevanciaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.relevanciaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relevância',
                    content: 'Erro ao apagar a relevância id ' + action.payload.relevanciaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RelevanciaListActions.DeleteRelevanciaFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _relevanciaService: RelevanciaService,
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

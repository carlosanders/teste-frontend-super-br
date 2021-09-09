import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as GarantiaListActions from '../actions';

import {GarantiaService} from '@cdk/services/garantia.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Garantia} from '@cdk/models';
import {garantia as garantiaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class GarantiaListEffect {

    routerState: any;
    /**
     * Get Garantias with router parameters
     *
     * @type {Observable<any>}
     */
    getGarantias: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<GarantiaListActions.GetGarantias>(GarantiaListActions.GET_GARANTIAS),
        switchMap(action => this._garantiaService.query(
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
            new AddData<Garantia>({data: response['entities'], schema: garantiaSchema}),
            new GarantiaListActions.GetGarantiasSuccess({
                entitiesId: response['entities'].map(garantia => garantia.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new GarantiaListActions.GetGarantiasFailed(err));
        })
    ));
    /**
     * Delete Garantia
     *
     * @type {Observable<any>}
     */
    deleteGarantia: Observable<GarantiaListActions.GarantiaListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<GarantiaListActions.DeleteGarantia>(GarantiaListActions.DELETE_GARANTIA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'garantia',
            content: 'Apagando a garantia id ' + action.payload.garantiaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._garantiaService.destroy(action.payload.garantiaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'garantia',
                    content: 'Garantia id ' + action.payload.garantiaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                }));
                this._store.dispatch(new UpdateData<Garantia>({
                    id: response.id,
                    schema: garantiaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new GarantiaListActions.DeleteGarantiaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.garantiaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'garantia',
                    content: 'Erro ao apagar a garantia id ' + action.payload.garantiaId + '!',
                    status: 2, // erro
                }));
                console.log(err);
                return of(new GarantiaListActions.DeleteGarantiaFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _garantiaService: GarantiaService,
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

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RegraEtiquetaListActions from '../actions';

import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {RegraEtiqueta} from '@cdk/models';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class RegraEtiquetaListEffect {
    routerState: any;
    /**
     * Get RegrasEtiqueta with router parameters
     *
     * @type {Observable<any>}
     */
    getRegrasEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RegraEtiquetaListActions.GetRegrasEtiqueta>(RegraEtiquetaListActions.GET_REGRAS_ETIQUETA),
        switchMap(action => this._regraEtiquetaService.query(
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
                new AddData<RegraEtiqueta>({data: response['entities'], schema: regraEtiquetaSchema}),
                new RegraEtiquetaListActions.GetRegrasEtiquetaSuccess({
                    entitiesId: response['entities'].map(regraEtiqueta => regraEtiqueta.id),
                    loaded: {
                        id: 'etiquetaHandle',
                        value: this.routerState.params.etiquetaHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new RegraEtiquetaListActions.GetRegrasEtiquetaFailed(err));
            })
        ))
    ));
    /**
     * Delete Regra
     *
     * @type {Observable<any>}
     */
    deleteRegra: Observable<RegraEtiquetaListActions.RegraEtiquetaListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RegraEtiquetaListActions.DeleteRegraEtiqueta>(RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'regra de etiqueta',
            content: 'Apagando a regra de etiqueta id ' + action.payload.regraEtiquetaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._regraEtiquetaService.destroy(action.payload.regraEtiquetaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'regra de etiqueta',
                    content: 'Regra de Etiqueta id ' + action.payload.regraEtiquetaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<RegraEtiqueta>({
                    id: response.id,
                    schema: regraEtiquetaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RegraEtiquetaListActions.DeleteRegraEtiquetaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.regraEtiquetaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'regra de etiqueta',
                    content: 'Erro ao apagar a regra de etiqueta id ' + action.payload.regraEtiquetaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RegraEtiquetaListActions.DeleteRegraEtiquetaFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _regraEtiquetaService: RegraEtiquetaService,
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

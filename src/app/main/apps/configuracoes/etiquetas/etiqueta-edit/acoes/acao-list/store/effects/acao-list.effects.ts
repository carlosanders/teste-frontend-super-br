import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AcaoListActions from '../actions';

import {AcaoService} from '@cdk/services/acao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Acao} from '@cdk/models';
import {acao as acaoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class AcaoListEffect {

    routerState: any;
    /**
     * Get Acoes with router parameters
     *
     * @type {Observable<any>}
     */
    getAcoes: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AcaoListActions.GetAcoes>(AcaoListActions.GET_ACOES),
        switchMap(action => this._acaoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate)).pipe(
            mergeMap(response => [
                new AddData<Acao>({data: response['entities'], schema: acaoSchema}),
                new AcaoListActions.GetAcoesSuccess({
                    entitiesId: response['entities'].map(acao => acao.id),
                    loaded: {
                        id: 'etiquetaHandle',
                        value: this.routerState.params.etiquetaHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new AcaoListActions.GetAcoesFailed(err));
            })
        ))
    ));
    /**
     * Delete Acao
     *
     * @type {Observable<any>}
     */
    deleteAcao: Observable<AcaoListActions.AcaoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AcaoListActions.DeleteAcao>(AcaoListActions.DELETE_ACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'ação',
            content: 'Apagando a ação id ' + action.payload.acaoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._acaoService.destroy(action.payload.acaoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'ação',
                    content: 'Ação id ' + action.payload.acaoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Acao>({
                    id: response.id,
                    schema: acaoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new AcaoListActions.DeleteAcaoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.acaoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'ação',
                    content: 'Erro ao apagar a ação id ' + action.payload.acaoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AcaoListActions.DeleteAcaoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _acaoService: AcaoService,
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

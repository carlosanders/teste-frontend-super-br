import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as LotacaoListActions from '../actions';

import {LotacaoService} from '@cdk/services/lotacao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class LotacaoListEffect {

    routerState: any;
    /**
     * Get Lotacoes with router parameters
     *
     * @type {Observable<any>}
     */
    getLotacoes: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LotacaoListActions.GetLotacoes>(LotacaoListActions.GET_LOTACOES),
        switchMap(action => this._lotacaoService.query(
            JSON.stringify(action.payload.filter),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<Lotacao>({data: response['entities'], schema: lotacaoSchema, populate: action.payload.populate}),
                new LotacaoListActions.GetLotacoesSuccess({
                    entitiesId: response['entities'].map(lotacao => lotacao.id),
                    loaded: {
                        id: 'lotacaoHandle',
                        value: this._loginService.getUserProfile().id
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new LotacaoListActions.GetLotacoesFailed(err));
            })
        ))
    ));
    /**
     * Delete Lotacao
     *
     * @type {Observable<any>}
     */
    deleteLotacao: Observable<LotacaoListActions.LotacaoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LotacaoListActions.DeleteLotacao>(LotacaoListActions.DELETE_LOTACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'lotação',
            content: 'Apagando a lotação id ' + action.payload.lotacaoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._lotacaoService.destroy(action.payload.lotacaoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'lotação',
                    content: 'Lotação id ' + action.payload.lotacaoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Lotacao>({
                    id: response.id,
                    schema: lotacaoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new LotacaoListActions.DeleteLotacaoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.lotacaoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'lotação',
                    content: 'Erro ao apagar a lotação id ' + action.payload.lotacaoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new LotacaoListActions.DeleteLotacaoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Lotacao
     *
     * @type {Observable<any>}
     */
    saveLotacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LotacaoListActions.SaveLotacao>(LotacaoListActions.SAVE_LOTACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'lotação',
            content: 'Salvando a lotação ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._lotacaoService.patch(action.payload.lotacao, action.payload.changes).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'lotação',
                content: 'Lotação id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Lotacao) => [
                new UpdateData<Lotacao>({
                    id: response.id,
                    schema: lotacaoSchema,
                    changes: {principal: response.principal}
                }),
                new LotacaoListActions.SaveLotacaoSuccess(),
                new AddData<Lotacao>({data: [response], schema: lotacaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'lotação',
                    content: 'Erro ao salvar a lotação!',
                    status: 2, // erro
                }));
                return of(new LotacaoListActions.SaveLotacaoFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _lotacaoService: LotacaoService,
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

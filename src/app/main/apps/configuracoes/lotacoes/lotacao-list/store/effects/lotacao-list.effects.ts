import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as LotacaoListActions from '../actions';

import {LotacaoService} from '@cdk/services/lotacao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models';
import {lotacao as lotacaoSchema} from '@cdk/normalizr/lotacao.schema';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class LotacaoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _lotacaoService: LotacaoService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Lotacoes with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getLotacoes: any =
        this._actions
            .pipe(
                ofType<LotacaoListActions.GetLotacoes>(LotacaoListActions.GET_LOTACOES),
                switchMap((action) => {
                    return this._lotacaoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Lotacao>({data: response['entities'], schema: lotacaoSchema}),
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
                    );
                })
            );

    /**
     * Delete Lotacao
     * @type {Observable<any>}
     */
    @Effect()
    deleteLotacao: any =
        this._actions
            .pipe(
                ofType<LotacaoListActions.DeleteLotacao>(LotacaoListActions.DELETE_LOTACAO),
                mergeMap((action) => {
                    return this._lotacaoService.destroy(action.payload).pipe(
                        map((response) => new LotacaoListActions.DeleteLotacaoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new LotacaoListActions.DeleteLotacaoFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Lotacao
     * @type {Observable<any>}
     */
    @Effect()
    saveLotacao: any =
        this._actions
            .pipe(
                ofType<LotacaoListActions.SaveLotacao>(LotacaoListActions.SAVE_LOTACAO),
                switchMap((action) => {
                    return this._lotacaoService.patch(action.payload.lotacao, action.payload.changes).pipe(
                        mergeMap((response: Lotacao) => [
                            new UpdateData<Lotacao>({id: response.id, schema: lotacaoSchema, changes: {principal: response.principal}}),
                            new LotacaoListActions.SaveLotacaoSuccess(),  new OperacoesActions.Resultado({
                                type: 'lotacao',
                                content: `Lotação id ${response.id} editada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new LotacaoListActions.SaveLotacaoFailed(err));
                        })
                    );
                })
            );
}

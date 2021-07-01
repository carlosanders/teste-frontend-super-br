import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as LotacaoListActions from '../actions';

import {LotacaoService} from '@cdk/services/lotacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../@cdk/utils';

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
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Lotacoes with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getLotacoes: any =
        this._actions
            .pipe(
                ofType<LotacaoListActions.GetLotacoes>(LotacaoListActions.GET_LOTACOES),
                switchMap(action => this._lotacaoService.query(
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
                            new AddData<Lotacao>({data: response['entities'], schema: lotacaoSchema}),
                            new LotacaoListActions.GetLotacoesSuccess({
                                entitiesId: response['entities'].map(lotacao => lotacao.id),
                                loaded: {
                                    id: this.routerState.params.setorHandle ? 'setorHandle' : 'usuarioHandle',
                                    value: this.routerState.params.setorHandle ? this.routerState.params.setorHandle : this.routerState.params.usuarioHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new LotacaoListActions.GetLotacoesFailed(err));
                        })
                    ))
            );

    /**
     * Delete Lotacao
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteLotacao: any =
        this._actions
            .pipe(
                ofType<LotacaoListActions.DeleteLotacao>(LotacaoListActions.DELETE_LOTACAO),
                mergeMap(action => this._lotacaoService.destroy(action.payload).pipe(
                        map(response => new LotacaoListActions.DeleteLotacaoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new LotacaoListActions.DeleteLotacaoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ), 25)
            );
}

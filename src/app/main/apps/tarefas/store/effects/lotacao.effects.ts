import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RootLotacaoListActions from '../actions/lotacao.actions';

import {LotacaoService} from '@cdk/services/lotacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Lotacao} from '@cdk/models/lotacao.model';
import {lotacao as lotacaoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class LotacaoListEffect {

    routerState: any;
    /**
     * Get Lotacoes with router parameters
     *
     * @type {Observable<any>}
     */
    getLotacoes: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RootLotacaoListActions.GetLotacoes>(RootLotacaoListActions.GET_LOTACOES),
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
                new RootLotacaoListActions.GetLotacoesSuccess({
                    entitiesId: response['entities'].map(lotacao => lotacao.id),
                    loaded: {
                        id: this.routerState.params.setorHandle ? 'setorHandle' : 'usuarioHandle',
                        value: this.routerState.params.setorHandle ? this.routerState.params.setorHandle : this.routerState.params.usuarioHandle
                    },
                    setorId: action.payload.setorId,
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new RootLotacaoListActions.GetLotacoesFailed(err));
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

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as HistoricoConfigListActions from '../actions';

import {LoginService} from 'app/main/auth/login/login.service';
import {HistoricoService} from '../../../../../../../../@cdk/services/historico.service';
import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {Historico} from '@cdk/models';
import {historico as historicoSchema} from '@cdk/normalizr';

@Injectable()
export class HistoricoConfigListEffect {

    routerState: any;
    /**
     * Get Historico with router parameters
     *
     * @type {Observable<any>}
     */
    getHistoricoConfig: any = createEffect(() => this._actions.pipe(
        ofType<HistoricoConfigListActions.GetHistoricoConfig>(HistoricoConfigListActions.GET_HISTORICO_CONFIG),
        switchMap((action) => {
            const filters = {
                ...action.payload.filter,
                ...action.payload.gridFilter,
            };
            return this._historicoService.query(
                JSON.stringify(filters),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(action.payload.context));
        }),
        mergeMap(response => [
            new AddData<Historico>({data: response['entities'], schema: historicoSchema}),
            new HistoricoConfigListActions.GetHistoricoConfigSuccess({
                entitiesId: response['entities'].map(historico => historico.id),
                loaded: {
                    id: 'usuarioHandle',
                    value: this._loginService.getUserProfile().id
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new HistoricoConfigListActions.GetHistoricoConfigFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _historicoService: HistoricoService,
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

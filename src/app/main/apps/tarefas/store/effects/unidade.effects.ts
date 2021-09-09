import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RootSetorActions from '../actions/unidade.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {unidade as unidadeSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class UnidadeEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
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

    /**
     * Get Unidades with router parameters
     *
     * @type {Observable<any>}
     */
    getUnidades: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<RootSetorActions.GetUnidades>(RootSetorActions.GET_UNIDADES),
                switchMap(action => this._setorService.query(
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
                        new AddData<Setor>({data: response['entities'], schema: unidadeSchema}),
                        new RootSetorActions.GetUnidadesSuccess({
                            entitiesId: response['entities'].map(unidade => unidade.id),
                            orgaoCentralId: action.payload.orgaoCentralId,
                            total: response['total']
                        })
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new RootSetorActions.GetUnidadesFailed(err));
                    })
                ))
            );
    });
}

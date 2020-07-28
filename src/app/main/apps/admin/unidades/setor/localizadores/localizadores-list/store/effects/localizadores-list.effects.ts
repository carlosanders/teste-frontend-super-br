import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RootLocalizadoresListActions from '../actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class LocalizadoresListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
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
     * Get Localizadores with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getLocalizadores: any =
        this._actions
            .pipe(
                ofType<RootLocalizadoresListActions.GetLocalizadores>(RootLocalizadoresListActions.GET_LOCALIZADORES),
                switchMap((action) => {
                    return this._localizadorService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<Localizador>({data: response['entities'], schema: localizadorSchema}),
                            new RootLocalizadoresListActions.GetLocalizadoresSuccess({
                                entitiesId: response['entities'].map(localizador => localizador.id),
                                loaded: {
                                    id: 'setorHandle',
                                    value: this.routerState.params['setorHandle']
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new RootLocalizadoresListActions.GetLocalizadoresFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Localizador
     * @type {Observable<any>}
     */
    @Effect()
    deleteLocalizador: any =
        this._actions
            .pipe(
                ofType<RootLocalizadoresListActions.DeleteLocalizador>(RootLocalizadoresListActions.DELETE_LOCALIZADOR),
                mergeMap((action) => {
                    return this._localizadorService.destroy(action.payload).pipe(
                        map((response) => new RootLocalizadoresListActions.DeleteLocalizadorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new RootLocalizadoresListActions.DeleteLocalizadorFailed(action.payload));
                        })
                    );
                })
            );
}

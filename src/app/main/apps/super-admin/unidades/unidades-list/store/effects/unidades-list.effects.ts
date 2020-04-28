import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as UnidadesListActions from '../actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models/setor.model';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class UnidadesListEffects {

    routerState: any;

    /**
     * 
     * @param _actions
     * @param _setorService
     * @param _loginService
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
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
     * Get Unidades with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getUnidades: any =
        this._actions
            .pipe(
                ofType<UnidadesListActions.GetUnidades>(UnidadesListActions.GET_UNIDADES),
                switchMap((action) => {
                    return this._setorService.query(
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
                            new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                            new UnidadesListActions.GetUnidadesSuccess({
                                entitiesId: response['entities'].map(setor => setor.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new UnidadesListActions.GetUnidadesFailed(err));
                        })
                    );
                })
            );
}

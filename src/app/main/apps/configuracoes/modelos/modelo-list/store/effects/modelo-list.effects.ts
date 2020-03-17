import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModeloListActions from '../actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ModeloListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
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
     * Get Modelos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getModelos: any =
        this._actions
            .pipe(
                ofType<ModeloListActions.GetModelos>(ModeloListActions.GET_MODELOS),
                switchMap((action) => {
                    return this._modeloService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Modelo>({data: response['entities'], schema: modeloSchema}),
                            new ModeloListActions.GetModelosSuccess({
                                entitiesId: response['entities'].map(modelo => modelo.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ModeloListActions.GetModelosFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Modelo
     * @type {Observable<any>}
     */
    @Effect()
    deleteModelo: any =
        this._actions
            .pipe(
                ofType<ModeloListActions.DeleteModelo>(ModeloListActions.DELETE_MODELO),
                mergeMap((action) => {
                    return this._modeloService.destroy(action.payload).pipe(
                        map((response) => new ModeloListActions.DeleteModeloSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new ModeloListActions.DeleteModeloFailed(action.payload));
                        })
                    );
                })
            );
}

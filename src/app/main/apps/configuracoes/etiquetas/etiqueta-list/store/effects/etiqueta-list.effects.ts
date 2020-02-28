import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as EtiquetaListActions from '../actions';

import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Etiqueta} from '@cdk/models';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr/etiqueta.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class EtiquetaListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _etiquetaService: EtiquetaService,
        private _loginService: LoginService,
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
     * Get Etiquetas with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getEtiquetas: any =
        this._actions
            .pipe(
                ofType<EtiquetaListActions.GetEtiquetas>(EtiquetaListActions.GET_ETIQUETAS),
                switchMap((action) => {
                    return this._etiquetaService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Etiqueta>({data: response['entities'], schema: etiquetaSchema}),
                            new EtiquetaListActions.GetEtiquetasSuccess({
                                entitiesId: response['entities'].map(etiqueta => etiqueta.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new EtiquetaListActions.GetEtiquetasFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Etiqueta
     * @type {Observable<any>}
     */
    @Effect()
    deleteEtiqueta: any =
        this._actions
            .pipe(
                ofType<EtiquetaListActions.DeleteEtiqueta>(EtiquetaListActions.DELETE_ETIQUETA),
                mergeMap((action) => {
                    return this._etiquetaService.destroy(action.payload).pipe(
                        map((response) => new EtiquetaListActions.DeleteEtiquetaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new EtiquetaListActions.DeleteEtiquetaFailed(action.payload));
                        })
                    );
                })
            );
}

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as FavoritoListActions from '../actions';

import {FavoritoService} from '@cdk/services/favorito.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models';
import {favorito as favoritoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../@cdk/utils';

@Injectable()
export class FavoritoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _favoritoService: FavoritoService,
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
     * Get Favoritos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getFavoritos: any =
        this._actions
            .pipe(
                ofType<FavoritoListActions.GetFavoritos>(FavoritoListActions.GET_FAVORITOS),
                switchMap(action => this._favoritoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap(response => [
                            new AddData<Favorito>({data: response['entities'], schema: favoritoSchema}),
                            new FavoritoListActions.GetFavoritosSuccess({
                                entitiesId: response['entities'].map(favorito => favorito.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListActions.GetFavoritosFailed(err));
                        })
                    ))
            );

    /**
     * Delete Favorito
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteFavorito: any =
        this._actions
            .pipe(
                ofType<FavoritoListActions.DeleteFavorito>(FavoritoListActions.DELETE_FAVORITO),
                mergeMap(action => this._favoritoService.destroy(action.payload).pipe(
                        map(response => new FavoritoListActions.DeleteFavoritoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListActions.DeleteFavoritoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    ))
            );
}

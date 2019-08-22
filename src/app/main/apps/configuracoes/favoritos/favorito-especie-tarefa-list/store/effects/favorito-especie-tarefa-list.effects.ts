import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as FavoritoListActions from '../actions';

import {FavoritoService} from '@cdk/services/favorito.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models/favorito.model';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class FavoritoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _favoritoService: FavoritoService,
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
     * Get Favoritos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getFavoritos: any =
        this._actions
            .pipe(
                ofType<FavoritoListActions.GetFavoritos>(FavoritoListActions.GET_FAVORITOS),
                switchMap((action) => {
                    return this._favoritoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate)).pipe(
                        mergeMap((response) => [
                            new AddData<Favorito>({data: response['entities'], schema: favoritoSchema}),
                            new FavoritoListActions.GetFavoritosSuccess({
                                entitiesId: response['entities'].map(favorito => favorito.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().usuario.id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListActions.GetFavoritosFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Favorito
     * @type {Observable<any>}
     */
    @Effect()
    deleteFavorito: any =
        this._actions
            .pipe(
                ofType<FavoritoListActions.DeleteFavorito>(FavoritoListActions.DELETE_FAVORITO),
                mergeMap((action) => {
                    return this._favoritoService.destroy(action.payload).pipe(
                        map((response) => new FavoritoListActions.DeleteFavoritoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListActions.DeleteFavoritoFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Toggle Urgente Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    ToggleFavoritoEspecieTarefa: any =
        this._actions
            .pipe(
                ofType<FavoritoListActions.ToggleFavoritoEspecieTarefa>(FavoritoListActions.TOGGLE_FAVORITO_ESPECIE_TAREFA),
                mergeMap((action) => {
                    return this._favoritoService.patch(action.payload, {
                        prioritario: !action.payload.prioritario
                    }).pipe(
                        mergeMap((response) => [
                            new FavoritoListActions.ToggleFavoritoEspecieSuccess(response.id),
                            new UpdateData<Favorito>({id: response.id, schema: favoritoSchema, changes: {prioritario: response.prioritario}})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListActions.ToggleFavoritoEspecieFailed(action.payload));
                        })
                    );
                })
            );

    /**
     * Save Favorito
     * @type {Observable<any>}
     */
    @Effect()
    saveFavorito: any =
        this._actions
            .pipe(
                ofType<FavoritoListActions.SaveFavorito>(FavoritoListActions.SAVE_FAVORITO),
                switchMap((action) => {
                    return this._favoritoService.save(action.payload).pipe(
                        mergeMap((response: Favorito) => [
                            new FavoritoListActions.SaveFavoritoSuccess(),
                            new AddData<Favorito>({data: [response], schema: favoritoSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FavoritoListActions.SaveFavoritoFailed(err));
                    return caught;
                })
            );

}

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import {FavoritoService} from '@cdk/services/favorito.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models';
import {Colaborador} from "@cdk/models/colaborador.model";
import * as FavoritoListActions from "../actions/favorito-list.actions";
import {favorito as favoritoSchema} from "@cdk/normalizr/favorito.schema";

@Injectable()
export class FavoritoEffect {
    routerState: any;
    private _profile: Colaborador;

    constructor(
        private _actions: Actions,
        private _favoritoService: FavoritoService,
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

        this._profile = _loginService.getUserProfile().colaborador;
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
                        JSON.stringify(action.payload.sort));
                }),
                mergeMap((response) => [
                    new AddData<Favorito>({data: response['entities'], schema: favoritoSchema}),
                    new FavoritoListActions.GetFavoritosSuccess({
                        entitiesId: response['entities'].map(favorito => favorito.id),
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FavoritoListActions.GetFavoritosFailed(err));
                    return caught;
                })
            );
}

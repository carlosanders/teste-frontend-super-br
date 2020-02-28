import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as FavoritoListEspecieTarefaActions from '../actions';

import {FavoritoService} from '@cdk/services/favorito.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';
import {LoginService} from 'app/main/auth/login/login.service';
import {Usuario} from '@cdk/models';

@Injectable()
export class FavoritoListEspecieTarefaEffect {

    routerState: any;

    favorito: Favorito;

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
                ofType<FavoritoListEspecieTarefaActions.GetFavoritos>(FavoritoListEspecieTarefaActions.GET_FAVORITOS_ESPECIE_TAREFA),
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
                            new FavoritoListEspecieTarefaActions.GetFavoritosSuccess({
                                entitiesId: response['entities'].map(favorito => favorito.id),
                                loaded: {
                                    id: 'favoritoHandle',
                                    value: response['entities'].map(favorito => favorito)
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListEspecieTarefaActions.GetFavoritosFailed(err));
                        })
                    );
                })
            );

    /**
     * Get Favorito with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getFavorito: any =
        this._actions
            .pipe(
                ofType<FavoritoListEspecieTarefaActions.GetFavorito>(FavoritoListEspecieTarefaActions.GET_FAVORITO_ESPECIE_TAREFA),
                switchMap((action) => {

                    return this._favoritoService.query(
                        JSON.stringify({
                            ...action.payload.filter
                        }),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ])).pipe(
                            map((resposta) => {

                            this.favorito = new Favorito();

                            if (resposta.entities && resposta.entities.length !== 0) {
                                this.favorito = resposta['entities'][0];
                                this.favorito.prioritario = true;
                            } else {
                                const usuario = new Usuario();
                                usuario.id = this._loginService.getUserProfile().id;
                                this.favorito.prioritario = true;
                                this.favorito.qtdUso = 1;
                                this.favorito.especieTarefa = action.payload.valor.especieTarefa;
                                this.favorito.usuario = usuario;
                            }
                        } ),
                            map(() => new FavoritoListEspecieTarefaActions.SaveFavorito(this.favorito)),
                            catchError((err, caught) => {
                                console.log(err);
                                this._store.dispatch(new FavoritoListEspecieTarefaActions.GetFavoritoFailed(err));
                                return caught;
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
                ofType<FavoritoListEspecieTarefaActions.DeleteFavorito>(FavoritoListEspecieTarefaActions.DELETE_FAVORITO_ESPECIE_TAREFA),
                mergeMap((action) => {
                    return this._favoritoService.destroy(action.payload).pipe(
                        map((response) => new FavoritoListEspecieTarefaActions.DeleteFavoritoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListEspecieTarefaActions.DeleteFavoritoFailed(action.payload));
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
                ofType<FavoritoListEspecieTarefaActions.ToggleFavoritoEspecieTarefa>(FavoritoListEspecieTarefaActions.TOGGLE_FAVORITO_ESPECIE_TAREFA),
                mergeMap((action) => {
                    return this._favoritoService.patch(action.payload, {
                        prioritario: !action.payload.prioritario
                    }).pipe(
                        mergeMap((response) => [
                            new FavoritoListEspecieTarefaActions.ToggleFavoritoEspecieSuccess(response.id),
                            new UpdateData<Favorito>({id: response.id, schema: favoritoSchema, changes: {prioritario: response.prioritario}})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new FavoritoListEspecieTarefaActions.ToggleFavoritoEspecieFailed(action.payload));
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
                ofType<FavoritoListEspecieTarefaActions.SaveFavorito>(FavoritoListEspecieTarefaActions.SAVE_FAVORITO_ESPECIE_TAREFA),
                switchMap((action) => {
                    return this._favoritoService.save(action.payload).pipe(
                        mergeMap((response: Favorito) => [
                            new AddData<Favorito>({data: [response], schema: favoritoSchema}),
                            new FavoritoListEspecieTarefaActions.SaveFavoritoSuccess(),
                            new FavoritoListEspecieTarefaActions.GetFavoritos({
                                filter: {
                                    'especieTarefa': 'isNotNull',
                                    'prioritario': 'eq:' + 'true',
                                    'usuario.id': 'eq:' + this._loginService.getUserProfile().id
                                },
                                gridFilter: {},
                                limit: 5,
                                offset: 0,
                                sort: {criadoEm: 'DESC'},
                                populate: [
                                    'especieTarefa'
                                ]
                            })
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FavoritoListEspecieTarefaActions.SaveFavoritoFailed(err));
                    return caught;
                })
            );

}

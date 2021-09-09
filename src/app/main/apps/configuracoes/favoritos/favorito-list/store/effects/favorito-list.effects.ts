import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as FavoritoListActions from '../actions';

import {FavoritoService} from '@cdk/services/favorito.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models';
import {favorito as favoritoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class FavoritoListEffect {
    routerState: any;
    /**
     * Get Favoritos with router parameters
     *
     * @type {Observable<any>}
     */
    getFavoritos: any = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Delete Favorito
     *
     * @type {Observable<any>}
     */
    deleteFavorito: Observable<FavoritoListActions.FavoritoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<FavoritoListActions.DeleteFavorito>(FavoritoListActions.DELETE_FAVORITO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'favorito',
            content: 'Apagando favorito id ' + action.payload.favoritoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._favoritoService.destroy(action.payload.favoritoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'favorito',
                    content: 'Favorito id ' + action.payload.favoritoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Favorito>({
                    id: response.id,
                    schema: favoritoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new FavoritoListActions.DeleteFavoritoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.favoritoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'favorito',
                    content: 'Erro ao apagar favorito id ' + action.payload.favoritoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new FavoritoListActions.DeleteFavoritoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _favoritoService: FavoritoService,
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

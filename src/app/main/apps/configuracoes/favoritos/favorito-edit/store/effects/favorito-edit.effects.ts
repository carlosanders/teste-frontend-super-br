import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as FavoritoEditActions from '../actions/favorito-edit.actions';
import * as FavoritoListActions from '../../../favorito-list/store/actions/favorito-list.actions';

import {FavoritoService} from '@cdk/services/favorito.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {favorito as favoritoSchema} from '@cdk/normalizr';
import {Favorito} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class FavoritoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _favoritoService: FavoritoService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router
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
     * Get Favorito with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getFavorito: any =
        this._actions
            .pipe(
                ofType<FavoritoEditActions.GetFavorito>(FavoritoEditActions.GET_FAVORITO),
                switchMap(action => this._favoritoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Favorito>({data: response['entities'], schema: favoritoSchema}),
                    new FavoritoEditActions.GetFavoritoSuccess({
                        loaded: {
                            id: 'favoritoHandle',
                            value: this.routerState.params.favoritoHandle
                        },
                        favoritoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new FavoritoEditActions.GetFavoritoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Favorito
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveFavorito: any =
        this._actions
            .pipe(
                ofType<FavoritoEditActions.SaveFavorito>(FavoritoEditActions.SAVE_FAVORITO),
                tap(() => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'favorito',
                        content: 'Salvando a favorito ...',
                        status: 0, // carregando
                    }));
                }),
                switchMap(action => this._favoritoService.save(action.payload).pipe(
                    tap(() =>
                        this._store.dispatch(new OperacoesActions.Operacao({
                            type: 'favorito',
                            content: 'Favorito salva com sucesso.',
                            status: 1, // sucesso
                        }))),
                    mergeMap((response: Favorito) => [
                        new FavoritoEditActions.SaveFavoritoSuccess(),
                        new FavoritoListActions.ReloadFavoritos(),
                        new AddData<Favorito>({data: [response], schema: favoritoSchema})
                    ])
                )),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'favorito',
                        content: 'Erro ao salvar a favorito!',
                        status: 2, // erro
                    }));
                    return of(this._store.dispatch(new FavoritoEditActions.SaveFavoritoFailed(err)));
                })
            );

    /**
     * Save Favorito Success
     */
    @Effect({dispatch: false})
    saveFavoritoSuccess: any =
        this._actions
            .pipe(
                ofType<FavoritoEditActions.SaveFavoritoSuccess>(FavoritoEditActions.SAVE_FAVORITO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.favoritoHandle), 'listar')]).then();
                })
            );
}

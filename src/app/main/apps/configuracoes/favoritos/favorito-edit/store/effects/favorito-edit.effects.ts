import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * getFavorito with router parameters
     *
     * @type {Observable<any>}
     */
    getFavorito: Observable<any> = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new FavoritoEditActions.GetFavoritoFailed(err));
        })
    ));
    /**
     * Save Favorito
     *
     * @type {Observable<any>}
     */
    saveFavorito: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<FavoritoEditActions.SaveFavorito>(FavoritoEditActions.SAVE_FAVORITO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'favorito',
            content: 'Salvando o favorito ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._favoritoService.save(action.payload.favorito).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'favorito',
                content: 'Favorito id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Favorito) => [
                new FavoritoEditActions.SaveFavoritoSuccess(),
                new FavoritoListActions.ReloadFavoritos(),
                new AddData<Favorito>({data: [response], schema: favoritoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'favorito',
                    content: 'Erro ao salvar o favorito!',
                    status: 2, // erro
                }));
                return of(new FavoritoEditActions.SaveFavoritoFailed(err));
            })
        ))
    ));
    /**
     * Save Favorito Success
     */
    saveFavoritoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<FavoritoEditActions.SaveFavoritoSuccess>(FavoritoEditActions.SAVE_FAVORITO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.favoritoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _favoritoService: FavoritoService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

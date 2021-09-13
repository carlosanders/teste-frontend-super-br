import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';

import * as VinculacaoPessoaUsuarioActions from '../actions/vinculacao-pessoa-usuario.actions';

import {VinculacaoPessoaUsuarioService} from '@cdk/services/vinculacao-pessoa-usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from '@cdk/normalizr';
import {VinculacaoPessoaUsuario} from '@cdk/models/vinculacao-pessoa-usuario.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoPessoaUsuarioListActions from '../../vinculacao-pessoa-usuario-list/store/actions';

@Injectable()
export class VinculacaoPessoaUsuarioEffects {
    routerState: any;
    /**
     * Get VinculacaoPessoaUsuario with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacaoPessoaUsuario: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaUsuarioActions.GetVinculacaoPessoaUsuario>(VinculacaoPessoaUsuarioActions.GET_VINCULACAO_PESSOA_USUARIO),
        switchMap(action => this._vinculacaoPessoaUsuarioService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<VinculacaoPessoaUsuario>({
                    data: response['entities'],
                    schema: vinculacaoPessoaUsuarioSchema
                }),
                new VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuarioSuccess({
                    entitiesId: response['entities'].map(vinculacaoPessoaUsuario => vinculacaoPessoaUsuario.id),
                    loaded: {
                        id: 'vinculacaoPessoaUsuarioHandle',
                        value: this.routerState.params.vinculacaoPessoaUsuarioHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuarioFailed(err));
            }))),
    ));

    /**
     *
     * @param _actions
     * @param _vinculacaoPessoaUsuarioService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaUsuarioService: VinculacaoPessoaUsuarioService,
        private _store: Store<State>,
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

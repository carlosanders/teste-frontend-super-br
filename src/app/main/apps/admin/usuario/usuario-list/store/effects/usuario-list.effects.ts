import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as UsuarioListActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {Usuario} from '@cdk/models/usuario.model';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class UsuarioListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
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
     * Get Usuarios with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getUsuarios: any =
        this._actions
            .pipe(
                ofType<UsuarioListActions.GetUsuarios>(UsuarioListActions.GET_USUARIOS),
                switchMap((action) => {
                    return this._usuarioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<Usuario>({data: response['entities'], schema: usuarioSchema}),
                            new UsuarioListActions.GetUsuariosSuccess({
                                entitiesId: response['entities'].map(usuario => usuario.id),
                                loaded: {
                                    id: 'unidadeHandle',
                                    value: this.routerState.params.unidadeHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new UsuarioListActions.GetUsuariosFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Usuario
     * @type {Observable<any>}
     */
    @Effect()
    deleteUsuario: any =
        this._actions
            .pipe(
                ofType<UsuarioListActions.DeleteUsuario>(UsuarioListActions.DELETE_USUARIO),
                mergeMap((action) => {
                    return this._usuarioService.destroy(action.payload).pipe(
                        map((response) => new UsuarioListActions.DeleteUsuarioSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new UsuarioListActions.DeleteUsuarioFailed(action.payload));
                        })
                    );
                })
            );
}
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as UsuariosListActions from '../actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {Usuario} from '@cdk/models/usuario.model';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

@Injectable()
export class UsuariosListEffects {

    routerState: any;

    /**
     *
     * @param _actions
     * @param _usuarioService
     * @param _loginService
     * @param _store
     */
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
                ofType<UsuariosListActions.GetUsuarios>(UsuariosListActions.GET_USUARIOS),
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
                            new UsuariosListActions.GetUsuariosSuccess({
                                entitiesId: response['entities'].map(usuario => usuario.id),
                                loaded: {
                                    id: 'generoHandle_entidadeHandle',
                                    value: this.routerState.params.generoHandle + '_' + this.routerState.params.entidadeHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new UsuariosListActions.GetUsuariosFailed(err));
                        })
                    );
                })
            );
}

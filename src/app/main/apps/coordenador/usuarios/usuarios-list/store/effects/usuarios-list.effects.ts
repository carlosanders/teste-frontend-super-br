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
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {CdkUtils} from "../../../../../../../../@cdk/utils";

@Injectable()
export class UsuariosListEffects {

    routerState: any;

    id: string;
    value: string;

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
                    this.id = 'generoHandle_entidadeHandle';
                    this.value = this.routerState.params.generoHandle + '_' +
                        this.routerState.params.entidadeHandle;
                    if (this.routerState.params['unidadeHandle']) {
                        this.id += '_unidadeHandle';
                        this.value += '_' + this.routerState.params.unidadeHandle;
                    }
                    if (this.routerState.params['setorHandle']) {
                        this.id += '_setorHandle';
                        this.value += '_' + this.routerState.params.setorHandle;
                    }
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
                                    id: this.id,
                                    value: this.value
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

    /**
     * Reset Senha Usuario
     * @type {Observable<any>}
     */
    @Effect()
    resetSenha: any =
        this._actions
            .pipe(
                ofType<UsuariosListActions.ResetSenha>(UsuariosListActions.RESET_SENHA),
                mergeMap((action) => {
                    return this._usuarioService.resetaSenha(action.payload).pipe(
                        map((response) => new UsuariosListActions.ResetSenhaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new UsuariosListActions.ResetSenhaFailed(action.payload));
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
                ofType<UsuariosListActions.DeleteUsuario>(UsuariosListActions.DELETE_USUARIO),
                mergeMap((action) => {
                    return this._usuarioService.destroy(action.payload).pipe(
                        map((response) => new UsuariosListActions.DeleteUsuarioSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new UsuariosListActions.DeleteUsuarioFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            );
                        })
                    );
                })
            );
}

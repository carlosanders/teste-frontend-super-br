import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as UsuarioEditActions from '../actions/usuario-edit.actions';
import * as UsuariosListActions from '../../../usuarios-list/store/actions/usuarios-list.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {colaborador as colaboradorSchema, usuario as usuarioSchema} from '@cdk/normalizr';
import {Colaborador, Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class UsuarioEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get Usuario with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getUsuario: any =
        this._actions
            .pipe(
                ofType<UsuarioEditActions.GetUsuario>(UsuarioEditActions.GET_USUARIO),
                switchMap(action => this._usuarioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'colaborador.cargo',
                            'colaborador.modalidadeColaborador'
                        ]))),
                switchMap(response => [
                    new AddData<Usuario>({data: response['entities'], schema: usuarioSchema}),
                    new UsuarioEditActions.GetUsuarioSuccess({
                        loaded: {
                            id: 'usuarioHandle',
                            value: this.routerState.params.usuarioHandle
                        },
                        usuarioId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UsuarioEditActions.GetUsuarioFailed(err));
                    return caught;
                })
            );

    /**
     * Save Usuario
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveUsuario: any =
        this._actions
            .pipe(
                ofType<UsuarioEditActions.SaveUsuario>(UsuarioEditActions.SAVE_USUARIO),
                switchMap(action => this._usuarioService.save(action.payload).pipe(
                        mergeMap((response: Usuario) => [
                            new UsuariosListActions.ReloadUsuarios(),
                            new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                            new UsuarioEditActions.SaveUsuarioSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UsuarioEditActions.SaveUsuarioFailed(err));
                    return caught;
                })
            );

    /**
     * Update Usuario
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateUsuario: any =
        this._actions
            .pipe(
                ofType<UsuarioEditActions.UpdateUsuario>(UsuarioEditActions.UPDATE_USUARIO),
                switchMap(action => this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
                        mergeMap((response: Usuario) => [
                            new UsuariosListActions.ReloadUsuarios(),
                            new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                            new UsuarioEditActions.UpdateUsuarioSuccess(response)
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UsuarioEditActions.UpdateUsuarioFailed(err));
                    return caught;
                })
            );

    /**
     * Save Usuario Success
     */
    @Effect({dispatch: false})
    saveUsuarioSuccess: any =
        this._actions
            .pipe(
                ofType<UsuarioEditActions.SaveUsuarioSuccess>(UsuarioEditActions.SAVE_USUARIO_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace(('criar'), action.payload.id)]).then();
                })
            );

    /**
     * Save Colaborador
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveColaborador: any =
        this._actions
            .pipe(
                ofType<UsuarioEditActions.SaveColaborador>(UsuarioEditActions.SAVE_COLABORADOR),
                switchMap(action => this._colaboradorService.save(action.payload).pipe(
                        mergeMap((response: Colaborador) => [
                            new UsuarioEditActions.SaveColaboradorSuccess(),
                            new UsuariosListActions.ReloadUsuarios(),
                            new AddData<Colaborador>({data: [response], schema: colaboradorSchema})
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UsuarioEditActions.SaveColaboradorFailed(err));
                    return caught;
                })
            );

    /**
     * Save Colaborador Success
     */
    @Effect({dispatch: false})
    saveColaboradorSuccess: any =
        this._actions
            .pipe(
                ofType<UsuarioEditActions.SaveColaboradorSuccess>(UsuarioEditActions.SAVE_COLABORADOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.usuarioHandle), 'listar')]).then();
                })
            );
}

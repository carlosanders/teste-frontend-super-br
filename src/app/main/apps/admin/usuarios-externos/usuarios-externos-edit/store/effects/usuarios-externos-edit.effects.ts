import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as UsuariosExternosEditActions from '../actions/usuarios-externos-edit.actions';
import * as UsuariosExternosListActions
    from '../../../usuarios-externos-list/store/actions/usuarios-externos-list.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';
import {Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as EspecieRelevanciaEditActions
    from '../../../../especie-relevancia/especie-relevancia-edit/store/actions/especie-relevancia-edit.actions';

@Injectable()
export class UsuariosExternosEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
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
     * Get Usuario with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getUsuariosExternos: any =
        this._actions
            .pipe(
                ofType<UsuariosExternosEditActions.GetUsuarioExternos>(UsuariosExternosEditActions.GET_USUARIOS_EXTERNOS),
                switchMap((action) => {
                    return this._usuarioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Usuario>({data: response['entities'], schema: usuarioSchema}),
                    new UsuariosExternosEditActions.GetUsuarioExternosSuccess({
                        loaded: {
                            id: 'usuariosExternosHandle',
                            value: this.routerState.params.usuariosExternosHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UsuariosExternosEditActions.GetUsuarioExternosFailed(err));
                    return caught;
                })
            );

    /**
     * Save Usuario
     * @type {Observable<any>}
     */
    @Effect()
    saveUsuariosExternos: any =
        this._actions
            .pipe(
                ofType<UsuariosExternosEditActions.SaveUsuarioExternos>(UsuariosExternosEditActions.SAVE_USUARIOS_EXTERNOS),
                switchMap((action) => {
                    return this._usuarioService.save(action.payload).pipe(
                        mergeMap((response: Usuario) => [
                            new UsuariosExternosListActions.ReloadUsuariosExternosList(),
                            new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                            new UsuariosExternosEditActions.SaveUsuarioExternosSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UsuariosExternosEditActions.SaveUsuarioExternosFailed(err));
                    return caught;
                })
            );

    // /**
    //  * Update Usuario
    //  * @type {Observable<any>}
    //  */
    // @Effect()
    // updateUsuariosExternos: any =
    //     this._actions
    //         .pipe(
    //             ofType<UsuariosExternosEditActions.UpdateUsuarioExternos>(UsuariosExternosEditActions.UPDATE_USUARIOS_EXTERNOS),
    //             switchMap((action) => {
    //                 debugger
    //                 return this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
    //                     mergeMap((response: Usuario) => [
    //                         new UsuariosExternosListActions.ReloadUsuariosExternosList(),
    //                         new AddData<Usuario>({data: [response], schema: usuarioSchema}),
    //                         new UsuariosExternosEditActions.UpdateUsuarioExternosSuccess(response)
    //                     ])
    //                 );
    //             }),
    //             catchError((err, caught) => {
    //                 console.log(err);
    //                 this._store.dispatch(new UsuariosExternosEditActions.UpdateUsuarioExternosFailed(err));
    //                 return caught;
    //             })
    //         );


    /**
     * Save Usuario Success
     */
    @Effect({dispatch: false})
    saveUsuarioExternosSuccess: any =
        this._actions
            .pipe(
                ofType<UsuariosExternosEditActions.SaveUsuarioExternosSuccess>(UsuariosExternosEditActions.SAVE_USUARIOS_EXTERNOS_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/externos/listar']).then();
                })
            );


}

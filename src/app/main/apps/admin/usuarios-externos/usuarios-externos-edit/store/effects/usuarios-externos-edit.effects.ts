import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as UsuariosExternosEditActions from '../actions/usuarios-externos-edit.actions';
import * as UsuariosExternosListActions
    from '../../../usuarios-externos-list/store/actions/usuarios-externos-list.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
    getUsuariosExternos: any =
        this._actions
            .pipe(
                ofType<UsuariosExternosEditActions.GetUsuarioExternos>(UsuariosExternosEditActions.GET_USUARIOS_EXTERNOS),
                switchMap(action => this._usuarioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}))),
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
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveUsuariosExternos: any =
        this._actions
            .pipe(
                ofType<UsuariosExternosEditActions.SaveUsuarioExternos>(UsuariosExternosEditActions.SAVE_USUARIOS_EXTERNOS),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'usuários externos',
                    content: 'Salvando o usuários externos ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._usuarioService.save(action.payload.usuariosExternos, context).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'usuários externos',
                                content: 'Usuários externos id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Usuario) => [
                            new UsuariosExternosEditActions.SaveUsuarioExternosSuccess(response),
                            new UsuariosExternosListActions.ReloadUsuariosExternosList(),
                            new AddData<Usuario>({data: [response], schema: usuarioSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'usuários externos',
                                content: 'Erro ao salvar o usuários externos!',
                                status: 2, // erro
                            }));
                            return of(new UsuariosExternosEditActions.SaveUsuarioExternosFailed(err));
                        })
                    )
                })
            );

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

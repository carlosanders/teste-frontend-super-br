import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class UsuarioEditEffects {
    routerState: any;
    /**
     * Get Usuario with router parameters
     *
     * @type {Observable<any>}
     */
    getUsuario: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuarioEditActions.GetUsuario>(UsuarioEditActions.GET_USUARIO),
        switchMap(action => this._usuarioService.get(
            action.payload.id,
            JSON.stringify([
                'populateAll',
                'colaborador.cargo',
                'colaborador.modalidadeColaborador'
            ]),
            JSON.stringify({isAdmin: true})
        )),
        switchMap(response => [
            new AddData<Usuario>({data: [response], schema: usuarioSchema}),
            new UsuarioEditActions.GetUsuarioSuccess({
                loaded: {
                    id: 'usuarioHandle',
                    value: this.routerState.params.usuarioHandle
                },
                usuarioId: this.routerState.params.usuarioHandle
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new UsuarioEditActions.GetUsuarioFailed(err));
        })
    ));
    /**
     * Save Usuario
     *
     * @type {Observable<any>}
     */
    saveUsuario: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuarioEditActions.SaveUsuario>(UsuarioEditActions.SAVE_USUARIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'usuário',
            content: 'Salvando o usuário ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._usuarioService.save(action.payload.usuario, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'usuário',
                    content: 'Usuário id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Usuario) => [
                    new UsuarioEditActions.SaveUsuarioSuccess(response),
                    new UsuariosListActions.ReloadUsuarios(),
                    new AddData<Usuario>({data: [response], schema: usuarioSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'usuario',
                        content: 'Erro ao salvar o usuário!',
                        status: 2, // erro
                    }));
                    return of(new UsuarioEditActions.SaveUsuarioFailed(err));
                })
            );
        })
    ));
    /**
     * Update Usuario
     *
     * @type {Observable<any>}
     */
    updateUsuario: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuarioEditActions.UpdateUsuario>(UsuarioEditActions.UPDATE_USUARIO),
        switchMap(action => this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
            mergeMap((response: Usuario) => [
                new UsuariosListActions.ReloadUsuarios(),
                new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                new UsuarioEditActions.UpdateUsuarioSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new UsuarioEditActions.UpdateUsuarioFailed(err));
        })
    ));
    /**
     * Save Usuario Success
     */
    saveUsuarioSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuarioEditActions.SaveUsuarioSuccess>(UsuarioEditActions.SAVE_USUARIO_SUCCESS),
        tap((action) => {
            this._router.navigate([this.routerState.url.replace(('criar'), action.payload.id)]).then();
        })
    ), {dispatch: false});
    /**
     * Uppdate Usuario Success
     */
    updateUsuarioSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuarioEditActions.UpdateUsuarioSuccess>(UsuarioEditActions.UPDATE_USUARIO_SUCCESS),
        tap((action) => {
            this._router.navigate([this.routerState.url.replace(('criar'), action.payload.id)]).then();
        })
    ), {dispatch: false});
    /**
     * Save Colaborador
     *
     * @type {Observable<any>}
     */
    saveColaborador: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuarioEditActions.SaveColaborador>(UsuarioEditActions.SAVE_COLABORADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'colaborador',
            content: 'Salvando o colaborador ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._colaboradorService.save(action.payload.colaborador).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'colaborador',
                content: 'Colaborador id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Colaborador) => [
                new UsuarioEditActions.SaveColaboradorSuccess(),
                new UsuariosListActions.ReloadUsuarios(),
                new AddData<Colaborador>({data: [response], schema: colaboradorSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'colaborador',
                    content: 'Erro ao salvar o colaborador!',
                    status: 2, // erro
                }));
                return of(new UsuarioEditActions.SaveColaboradorFailed(err));
            })
        ))
    ));
    /**
     * Save Colaborador Success
     */
    saveColaboradorSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuarioEditActions.SaveColaboradorSuccess>(UsuarioEditActions.SAVE_COLABORADOR_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.usuarioHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _colaboradorService: ColaboradorService,
        private _store: Store<State>,
        private _loginService: LoginService,
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

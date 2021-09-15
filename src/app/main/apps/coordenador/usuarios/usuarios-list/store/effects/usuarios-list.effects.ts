import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as UsuariosListActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {Usuario} from '@cdk/models/usuario.model';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class UsuariosListEffects {
    routerState: any;
    id: string;
    value: string;
    /**
     * Get Usuarios with router parameters
     *
     * @type {Observable<any>}
     */
    getUsuarios: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuariosListActions.GetUsuarios>(UsuariosListActions.GET_USUARIOS),
        switchMap(action => this._usuarioService.query(
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
        ))
    ));
    /**
     * Reset Senha Usuario
     *
     * @type {Observable<any>}
     */
    resetSenha: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UsuariosListActions.ResetSenha>(UsuariosListActions.RESET_SENHA),
        mergeMap(action => this._usuarioService.resetaSenha(action.payload).pipe(
            map(response => new UsuariosListActions.ResetSenhaSuccess(response.id)),
            catchError((err) => {
                console.log(err);
                return of(new UsuariosListActions.ResetSenhaFailed(action.payload));
            })
        ), 25)
    ));
    /**
     * Delete Usuario
     *
     * @type {Observable<any>}
     */
    deleteUsuario: Observable<UsuariosListActions.UsuariosListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<UsuariosListActions.DeleteUsuario>(UsuariosListActions.DELETE_USUARIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'usuário',
            content: 'Apagando o usuário id ' + action.payload.usuarioId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._usuarioService.destroy(action.payload.usuarioId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'usuário',
                    content: 'Usuário id ' + action.payload.usuarioId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Usuario>({
                    id: response.id,
                    schema: usuarioSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new UsuariosListActions.DeleteUsuarioSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.usuarioId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'usuário',
                    content: 'Erro ao apagar o usuário id ' + action.payload.usuarioId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new UsuariosListActions.DeleteUsuarioFailed(payload));
            })
        ), 25)
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
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
        });
    }
}

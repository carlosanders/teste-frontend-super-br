import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProfileActions from '../actions/perfil.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ComponenteDigital, Usuario} from '@cdk/models';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema, usuario as usuarioSchema} from '@cdk/normalizr';
import * as LoginActions from '../../../../../auth/login/store/actions/login.actions';
import {ComponenteDigitalService} from "../../../../../../../@cdk/services/componente-digital.service";

@Injectable()
export class ProfileEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _componenteDigitalService: ComponenteDigitalService,
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

    saveProfile: any = createEffect(() => {
        return this._actions.pipe(
                ofType<ProfileActions.SaveProfile>(ProfileActions.SAVE_PERFIL),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'profile',
                    content: 'Alterando o usuário ...',
                    status: 0, // carregando
                }))),
                switchMap(action => this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
                    tap((response) =>
                        this._store.dispatch(new OperacoesActions.Operacao({
                            id: action.payload.operacaoId,
                            type: 'profile',
                            content: 'Usuário id ' + response.id + ' salvo com sucesso.',
                            status: 1, // sucesso
                        }))
                    ),
                    mergeMap((response: Usuario) => [
                        new ProfileActions.SaveProfileSuccess(),
                        new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                        new LoginActions.LoginProfile({redirect: false})
                    ]),
                    catchError((err) => {
                        console.log(err);
                        this._store.dispatch(new OperacoesActions.Operacao({
                            id: action.payload.operacaoId,
                            type: 'profile',
                            content: 'Erro ao alterar o usuário!',
                            status: 2, // erro
                        }));
                        return of(new ProfileActions.SaveProfileFailed(err));
                    })
                ))
            );
    });

    uploadImagemChancela: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ProfileActions.UploadImagemChancela>(ProfileActions.UPLOAD_IMAGEM_CHANCELA),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'componente digital',
                    content: 'Salvando o componente digital ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'componente digital',
                                content: 'Componente digital id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: ComponenteDigital) => [
                            new AddData<ComponenteDigital>({data: [response], schema: componenteDigitalSchema}),
                            new ProfileActions.UploadImagemChancelaSuccess(response)
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'componente digital',
                                content: 'Erro ao salvar o componente digital!',
                                status: 2, // erro
                            }));
                            return of(new ProfileActions.UploadImagemPerfilFailed(err));
                        })
                    )
                })
            )
    });
}

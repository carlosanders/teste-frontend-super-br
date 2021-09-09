import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProfileActions from '../actions/perfil.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ComponenteDigital, Usuario} from '@cdk/models';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema, usuario as usuarioSchema} from '@cdk/normalizr';
import * as LoginActions from '../../../../../auth/login/store/actions/login.actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class ProfileEffect {
    routerState: any;

    saveProfile: any = createEffect(() => this._actions.pipe(
        ofType<ProfileActions.SaveProfile>(ProfileActions.SAVE_PERFIL),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'usuário',
            content: 'Editando o usuário...',
            status: 0, // carregando
        }))),
        switchMap(action => this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
            mergeMap((response: Usuario) => [
                new UpdateData<Usuario>({
                    id: response.id,
                    schema: usuarioSchema,
                    changes: {assinaturaHTML: response.assinaturaHTML}
                }),
                new ProfileActions.SaveProfileSuccess(),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'usuário',
                    content: `Usuário id ${response.id} editado com sucesso!`,
                    status: 1 //sucesso
                }),
                new LoginActions.LoginProfile({redirect: false})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'usuário',
                    content: 'Erro ao editar o usuário!',
                    status: 2, // erro
                }));
                return of(new ProfileActions.SaveProfileFailed(err));
            })
        ))
    ));

    uploadImagemPerfil: any = createEffect(() => this._actions.pipe(
        ofType<ProfileActions.UploadImagemPerfil>(ProfileActions.UPLOAD_IMAGEM_PERFIL),
        switchMap(action => this._componenteDigitalService.save(action.payload).pipe(
            mergeMap((response: ComponenteDigital) => [
                new AddData<ComponenteDigital>({data: [response], schema: componenteDigitalSchema}),
                new ProfileActions.UploadImagemPerfilSuccess(response)
            ]),
            catchError(err => of(new ProfileActions.UploadImagemPerfilFailed(err)))
        ))
    ));

    uploadImagemChancela: any = createEffect(() => this._actions.pipe(
        ofType<ProfileActions.UploadImagemChancela>(ProfileActions.UPLOAD_IMAGEM_CHANCELA),
        switchMap(action => this._componenteDigitalService.save(action.payload.componenteDigital).pipe(
            mergeMap((response: ComponenteDigital) => [
                new AddData<ComponenteDigital>({data: [response], schema: componenteDigitalSchema}),
                new ProfileActions.UploadImagemChancelaSuccess(response)
            ]),
            catchError(err => of(new ProfileActions.UploadImagemChancelaFailed(err)))
        ))
    ));

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(
                select(getRouterState),
                filter(routerState => !!routerState)
            )
            .subscribe((routerState) => {
                this.routerState = routerState.state;
            });
    }
}

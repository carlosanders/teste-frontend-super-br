import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import * as ProfileActions from '../actions/perfil.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ComponenteDigital, Usuario} from '@cdk/models';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema, componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
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
        return this._actions
            .pipe(
                ofType<ProfileActions.SaveProfile>(ProfileActions.SAVE_PERFIL),
                switchMap((action) => {
                    return this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
                        mergeMap((response: Usuario) => [
                            new UpdateData<Usuario>({id: response.id, schema: usuarioSchema, changes: {assinaturaHTML: response.assinaturaHTML}}),
                            new ProfileActions.SaveProfileSuccess(),  new OperacoesActions.Resultado({
                                type: 'usuario',
                                content: `Usuário id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new LoginActions.LoginProfile({redirect: false})
                        ]),
                        catchError((err) => {
                            return of(new ProfileActions.SaveProfileFailed(err));
                        })
                    );
                })
            );
    });

    uploadImagemPerfil: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ProfileActions.UploadImagemPerfil>(ProfileActions.UPLOAD_IMAGEM_PERFIL),
                switchMap((action) => {
                    return this._componenteDigitalService.save(action.payload).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new AddData<ComponenteDigital>({data: [response], schema: componenteDigitalSchema}),
                            new ProfileActions.UploadImagemPerfilSuccess(response)
                        ]),
                        catchError((err) => {
                            return of(new ProfileActions.UploadImagemPerfilFailed(err));
                        })
                    );
                })
            );
    });

    uploadImagemChancela: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ProfileActions.UploadImagemChancela>(ProfileActions.UPLOAD_IMAGEM_CHANCELA),
                switchMap((action) => {
                    return this._componenteDigitalService.save(action.payload).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new AddData<ComponenteDigital>({data: [response], schema: componenteDigitalSchema}),
                            new ProfileActions.UploadImagemChancelaSuccess(response)
                        ]),
                        catchError((err) => {
                            return of(new ProfileActions.UploadImagemChancelaFailed(err));
                        })
                    );
                })
            );
    });
}

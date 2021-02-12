import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import * as ProfileActions from '../actions/perfil.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {Usuario} from '@cdk/models';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import * as LoginActions from '../../../../../auth/login/store/actions/login.actions';

@Injectable()
export class ProfileEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
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
     * Save Profile
     * @type {Observable<any>}
     */
    @Effect()
    saveProfile: any =
        this._actions
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
                            console.log (err);
                            return of(new ProfileActions.SaveProfileFailed(err));
                        })
                    );
                })
            );
}

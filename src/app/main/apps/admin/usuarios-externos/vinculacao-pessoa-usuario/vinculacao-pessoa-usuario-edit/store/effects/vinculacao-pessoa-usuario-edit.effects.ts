import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as VinculacaoPessoaUsuarioEditActions from '../actions/vinculacao-pessoa-usuario-edit.actions';
import * as VinculacaoPessoaUsuarioListActions from '../../../vinculacao-pessoa-usuario-list/store/actions/vinculacao-pessoa-usuario-list.actions';

import {VinculacaoPessoaUsuarioService} from '@cdk/services/vinculacao-pessoa-usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from '@cdk/normalizr/vinculacao-pessoa-usuario.schema';
import {VinculacaoPessoaUsuario} from '@cdk/models/vinculacao-pessoa-usuario.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class VinculacaoPessoaUsuarioEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaUsuarioService: VinculacaoPessoaUsuarioService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
     * Save VinculacaoPessoaUsuario
     * @type {Observable<any>}
     */
    @Effect()
    saveVinculacaoPessoaUsuario: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuario>(VinculacaoPessoaUsuarioEditActions.SAVE_VINCULACAO_PESSOA_USUARIO),
                switchMap((action) => {
                    return this._vinculacaoPessoaUsuarioService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoPessoaUsuario) => [
                            new VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuarioSuccess(),
                            new VinculacaoPessoaUsuarioListActions.ReloadVinculacaoPessoaUsuario(),
                            new AddData<VinculacaoPessoaUsuario>({data: [response], schema: vinculacaoPessoaUsuarioSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuarioFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoPessoaUsuario Success
     */
    @Effect({dispatch: false})
    saveVinculacaoPessoaUsuarioSuccess: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuarioSuccess>(VinculacaoPessoaUsuarioEditActions.SAVE_VINCULACAO_PESSOA_USUARIO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('criar'), 'listar')]).then();
                })
            );
}

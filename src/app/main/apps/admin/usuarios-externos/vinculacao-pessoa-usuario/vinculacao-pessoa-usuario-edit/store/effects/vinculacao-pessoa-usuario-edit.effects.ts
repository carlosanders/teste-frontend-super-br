import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as VinculacaoPessoaUsuarioEditActions from '../actions/vinculacao-pessoa-usuario-edit.actions';
import * as VinculacaoPessoaUsuarioListActions
    from '../../../vinculacao-pessoa-usuario-list/store/actions/vinculacao-pessoa-usuario-list.actions';

import {VinculacaoPessoaUsuarioService} from '@cdk/services/vinculacao-pessoa-usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from '@cdk/normalizr';
import {VinculacaoPessoaUsuario} from '@cdk/models/vinculacao-pessoa-usuario.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VinculacaoPessoaUsuarioEditEffect {
    routerState: any;

    /**
     * Save VinculacaoPessoaUsuario
     *
     * @type {Observable<any>}
     */
    saveVinculacaoPessoaUsuario: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuario>(VinculacaoPessoaUsuarioEditActions.SAVE_VINCULACAO_PESSOA_USUARIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação pessoa',
            content: 'Salvando a vinculação pessoa ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._vinculacaoPessoaUsuarioService.save(action.payload.vinculacaoPessoaUsuario, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação pessoa',
                    content: 'Vinculação pessoa id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: VinculacaoPessoaUsuario) => [
                    new VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuarioSuccess(),
                    new VinculacaoPessoaUsuarioListActions.ReloadVinculacaoPessoaUsuario(),
                    new AddData<VinculacaoPessoaUsuario>({
                        data: [response],
                        schema: vinculacaoPessoaUsuarioSchema
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação pessoa',
                        content: 'Erro ao salvar a vinculação pessoa!',
                        status: 2, // erro
                    }));
                    return of(new VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuarioFailed(err));
                })
            );
        })
    ));

    /**
     * Save VinculacaoPessoaUsuario Success
     */
    saveVinculacaoPessoaUsuarioSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoPessoaUsuarioEditActions.SaveVinculacaoPessoaUsuarioSuccess>(VinculacaoPessoaUsuarioEditActions.SAVE_VINCULACAO_PESSOA_USUARIO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('criar'), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaUsuarioService: VinculacaoPessoaUsuarioService,
        private _store: Store<State>,
        public _loginService: LoginService,
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

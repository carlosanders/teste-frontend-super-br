import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as SegurancaActions from '../actions/seguranca.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AddData} from '../../../../../../../@cdk/ngrx-normalizr';

@Injectable()
export class SegurancaEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _store: Store<State>,
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
     * Save Seguranca
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveSeguranca: any =
        this._actions
            .pipe(
                ofType<SegurancaActions.SaveSeguranca>(SegurancaActions.SAVE_SEGURANCA),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'seguranca',
                    content: 'Salvando o seguranca ...',
                    status: 0, // carregando
                }))),
                switchMap(action => this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
                    tap((response) =>
                        this._store.dispatch(new OperacoesActions.Operacao({
                            id: action.payload.operacaoId,
                            type: 'seguranca',
                            content: 'Seguranca id ' + response.id + ' salvo com sucesso.',
                            status: 1, // sucesso
                        }))
                    ),
                    mergeMap((response: Usuario) => [
                        new SegurancaActions.SaveSegurancaSuccess(),
                    ]),
                    catchError((err) => {
                        console.log(err);
                        this._store.dispatch(new OperacoesActions.Operacao({
                            id: action.payload.operacaoId,
                            type: 'seguranca',
                            content: 'Erro ao salvar o seguranca!',
                            status: 2, // erro
                        }));
                        return of(new SegurancaActions.SaveSegurancaFailed(err));
                    })
                ))
            );
}

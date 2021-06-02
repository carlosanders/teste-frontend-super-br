import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as SegurancaActions from '../actions/seguranca.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
                switchMap(action => this._usuarioService.patch(action.payload.usuario, action.payload.changes).pipe(
                        mergeMap((response: Usuario) => [
                            new SegurancaActions.SaveSegurancaSuccess(),  new OperacoesActions.Resultado({
                                type: 'usuario',
                                content: `Usuário id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new SegurancaActions.SaveSegurancaFailed(err));
                        })
                    ))
            );
}

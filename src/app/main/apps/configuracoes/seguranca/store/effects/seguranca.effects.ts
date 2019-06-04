import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as SegurancaActions from '../actions/seguranca.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {Usuario} from '@cdk/models/usuario.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

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
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Seguranca
     * @type {Observable<any>}
     */
    @Effect()
    saveSeguranca: any =
        this._actions
            .pipe(
                ofType<SegurancaActions.SaveSeguranca>(SegurancaActions.SAVE_SEGURANCA),
                switchMap((action) => {
                    return this._usuarioService.save(action.payload).pipe(
                        mergeMap((response: Usuario) => [
                            new SegurancaActions.SaveSegurancaSuccess()
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new SegurancaActions.SaveSegurancaFailed(err));
                    return caught;
                })
            );
}

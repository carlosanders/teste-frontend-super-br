import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as RegisterActions from '../actions';
import {UsuarioService} from '@cdk/services/usuario.service';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

import {Usuario} from '@cdk/models';
import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class RegisterEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _usuarioService: UsuarioService,
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
     * Registar Usuario
     * @type {Observable<any>}
     */
    @Effect()
    register: any =
        this._actions
            .pipe(
                ofType<RegisterActions.Register>(RegisterActions.REGISTER),
                switchMap((action) => {
                    return this._usuarioService.save(action.payload).pipe(
                        mergeMap((response: Usuario) => [
                            new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                            new RegisterActions.RegisterSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RegisterActions.RegisterFailed(err));
                    return caught;
                })
            );
}

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import * as ActivateActions from '../actions';
import {UsuarioService} from '@cdk/services/usuario.service';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Usuario} from '@cdk/models';

@Injectable()
export class ActivateEffects {

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
     * Active Usuario
     * @type {Observable<any>}
     */
    @Effect()
    active: any =
        this._actions
            .pipe(
                ofType<ActivateActions.Activate>(ActivateActions.ACTIVATE),
                switchMap((action) => {
                    return this._usuarioService.active(action.payload.cpf.value, action.payload.token.value, action.payload.context);
                }),
                mergeMap(response => [
                    new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                    new ActivateActions.ActivateSuccess({
                        loaded: {
                            id: 'cpfHandle_tokenHandle',
                            value: this.routerState.params.cpfHandle + '_' + this.routerState.params.tokenHandle,
                        },
                        usuario: response
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ActivateActions.ActivateFailed(err));
                    return caught;
                })
            );
}

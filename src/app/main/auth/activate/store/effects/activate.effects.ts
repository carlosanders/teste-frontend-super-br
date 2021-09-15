import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';
import * as ActivateActions from '../actions';
import {UsuarioService} from '@cdk/services/usuario.service';
import {usuario as usuarioSchema} from '@cdk/normalizr';

import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Usuario} from '@cdk/models';
import {Observable, of} from 'rxjs';

@Injectable()
export class ActivateEffects {
    routerState: any;
    /**
     * Active Usuario
     *
     * @type {Observable<any>}
     */
    active: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ActivateActions.Activate>(ActivateActions.ACTIVATE),
        switchMap(action => this._usuarioService.active(action.payload.cpf.value, action.payload.token.value, action.payload.context)),
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
        catchError((err) => {
            console.log(err);
            return of(new ActivateActions.ActivateFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _usuarioService: UsuarioService,
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

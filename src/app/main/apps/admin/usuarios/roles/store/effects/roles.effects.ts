import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as RolesActions from '../actions/roles.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {Usuario} from '@cdk/models';

@Injectable()
export class RolesEffects {
    routerState: any;
    /**
     * Get Usuario with router parameters
     *
     * @type {Observable<any>}
     */
    getUsuario: any = createEffect(() => this._actions.pipe(
            ofType<RolesActions.GetUsuario>(RolesActions.GET_USUARIO),
            switchMap(action => this._usuarioService.get(
                action.payload.id,
                JSON.stringify([
                    'populateAll',
                    'colaborador.cargo',
                    'colaborador.modalidadeColaborador',
                    'colaborador.usuario'
                ]),
                JSON.stringify({isAdmin: true})
            )),
            switchMap(response => [
                new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                new RolesActions.GetUsuarioSuccess({
                    loaded: {
                        id: 'usuarioHandle',
                        value: this.routerState.params.usuarioHandle
                    },
                    usuarioId: this.routerState.params.usuarioHandle
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new RolesActions.GetUsuarioFailed(err));
            })
        )
    );

    /**
     *
     * @param _actions
     * @param _usuarioService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _store: Store<State>,
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

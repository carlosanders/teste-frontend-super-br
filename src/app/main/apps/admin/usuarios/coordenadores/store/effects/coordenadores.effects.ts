import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as CoordenadoresActions from '../actions/coordenadores.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {Usuario} from '@cdk/models';

@Injectable()
export class CoordenadoresEffects {
    routerState: any;

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
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Usuario with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getUsuario: any =
        this._actions
            .pipe(
                ofType<CoordenadoresActions.GetUsuario>(CoordenadoresActions.GET_USUARIO),
                switchMap((action) => {
                    return this._usuarioService.get(
                        action.payload.id,
                        JSON.stringify([
                            'populateAll',
                            'colaborador.cargo',
                            'colaborador.modalidadeColaborador',
                            'colaborador.usuario'
                        ]),
                        JSON.stringify({isAdmin: true})
                    );
                }),
                switchMap(response => [
                    new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                    new CoordenadoresActions.GetUsuarioSuccess({
                        loaded: {
                            id: 'usuarioHandle',
                            value: this.routerState.params.usuarioHandle
                        },
                        usuarioId:this.routerState.params.usuarioHandle
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new CoordenadoresActions.GetUsuarioFailed(err));
                    return caught;
                })
            );
}

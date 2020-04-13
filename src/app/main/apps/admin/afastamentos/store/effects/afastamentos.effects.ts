import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as AfastamentosActions from '../actions/afastamentos.actions';

import {UsuarioService} from '@cdk/services/usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';
import {Usuario} from '@cdk/models';

@Injectable()
export class AfastamentosEffects {
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
                ofType<AfastamentosActions.GetUsuario>(AfastamentosActions.GET_USUARIO),
                switchMap((action) => {
                    return this._usuarioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'colaborador',
                            'colaborador.cargo',
                            'colaborador.modalidadeColaborador',
                            'colaborador.usuario',
                            'colaborador.lotacoes'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Usuario>({data: response['entities'], schema: usuarioSchema}),
                    new AfastamentosActions.GetUsuarioSuccess({
                        loaded: {
                            id: 'usuarioHandle',
                            value: this.routerState.params.usuarioHandle
                        },
                        usuarioId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AfastamentosActions.GetUsuarioFailed(err));
                    return caught;
                })
            );
}

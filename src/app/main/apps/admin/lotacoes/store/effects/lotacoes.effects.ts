import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as RootLotacoesActions from '../actions/lotacoes.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema, usuario as usuarioSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Usuario} from '@cdk/models';
import {UsuarioService} from '@cdk/services/usuario.service';

@Injectable()
export class LotacoesEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _setorService
     * @param _usuarioService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
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
     * Get Setor with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getSetor: any =
        this._actions
            .pipe(
                ofType<RootLotacoesActions.GetSetor>(RootLotacoesActions.GET_SETOR),
                switchMap((action) => {
                    return this._setorService.get(
                        action.payload.id,
                        JSON.stringify(['populateAll']),
                        JSON.stringify({isAdmin: true})
                    );
                }),
                switchMap(response => [
                    new AddData<Setor>({data: [response], schema: setorSchema}),
                    new RootLotacoesActions.GetSetorSuccess({
                        loaded: {
                            id: 'setorHandle',
                            value: this.routerState.params.setorHandle
                        },
                        setorId: this.routerState.params.setorHandle
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLotacoesActions.GetSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Get Usuario with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getUsuario: any =
        this._actions
            .pipe(
                ofType<RootLotacoesActions.GetUsuario>(RootLotacoesActions.GET_USUARIO),
                switchMap((action) => {
                    return this._usuarioService.get(
                        action.payload.id,
                        JSON.stringify(['populateAll']),
                        JSON.stringify({isAdmin: true})
                    );
                }),
                switchMap(response => [
                    new AddData<Usuario>({data: [response], schema: usuarioSchema}),
                    new RootLotacoesActions.GetUsuarioSuccess({
                        loaded: {
                            id: 'usuarioHandle',
                            value: this.routerState.params.usuarioHandle
                        },
                        usuarioId: this.routerState.params.usuarioHandle
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLotacoesActions.GetUsuarioFailed(err));
                    return caught;
                })
            );
}

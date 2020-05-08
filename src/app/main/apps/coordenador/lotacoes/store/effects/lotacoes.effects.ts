import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as LotacoesActions from '../actions/lotacoes.actions';

import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';
import {Usuario} from '@cdk/models';

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
                ofType<LotacoesActions.GetSetor>(LotacoesActions.GET_SETOR),
                switchMap((action) => {
                    return this._setorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                    new LotacoesActions.GetSetorSuccess({
                        loaded: {
                            id: 'setorHandle',
                            value: this.routerState.params.setorHandle
                        },
                        setorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new LotacoesActions.GetSetorFailed(err));
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
                ofType<LotacoesActions.GetUsuario>(LotacoesActions.GET_USUARIO),
                switchMap((action) => {
                    return this._usuarioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Usuario>({data: response['entities'], schema: usuarioSchema}),
                    new LotacoesActions.GetUsuarioSuccess({
                        loaded: {
                            id: 'usuarioHandle',
                            value: this.routerState.params.usuarioHandle
                        },
                        setorId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new LotacoesActions.GetUsuarioFailed(err));
                    return caught;
                })
            );
}

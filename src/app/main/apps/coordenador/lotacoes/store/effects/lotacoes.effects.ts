import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

import * as LotacoesActions from '../actions/lotacoes.actions';

import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema, usuario as usuarioSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Usuario} from '@cdk/models';

@Injectable()
export class LotacoesEffects {
    routerState: any;
    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    getSetor: any = createEffect(() => this._actions.pipe(
        ofType<LotacoesActions.GetSetor>(LotacoesActions.GET_SETOR),
        switchMap(action => this._setorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new LotacoesActions.GetSetorFailed(err));
        })
    ));
    /**
     * Get Usuario with router parameters
     *
     * @type {Observable<any>}
     */
    getUsuario: any = createEffect(() => this._actions.pipe(
        ofType<LotacoesActions.GetUsuario>(LotacoesActions.GET_USUARIO),
        switchMap(action => this._usuarioService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Usuario>({data: response['entities'], schema: usuarioSchema}),
            new LotacoesActions.GetUsuarioSuccess({
                loaded: {
                    id: 'usuarioHandle',
                    value: this.routerState.params.usuarioHandle
                },
                usuarioId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new LotacoesActions.GetUsuarioFailed(err));
        })
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as GrupoContatoEditActions from '../actions/grupo-contato-edit.actions';
import * as GrupoContatoListActions from '../../../grupo-contato-list/store/actions/grupo-contato-list.actions';

import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';
import {GrupoContato} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class GrupoContatoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _grupoContatoService: GrupoContatoService,
        private _store: Store<State>,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get GrupoContato with router parameters
     *
     * @type {Observable<any>}
     */
    getGrupoContato: any = createEffect(() => this._actions
            .pipe(
                ofType<GrupoContatoEditActions.GetGrupoContato>(GrupoContatoEditActions.GET_GRUPO_CONTATO),
                switchMap(action => this._grupoContatoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<GrupoContato>({data: response['entities'], schema: grupoContatoSchema}),
                    new GrupoContatoEditActions.GetGrupoContatoSuccess({
                        loaded: {
                            id: 'grupoContatoHandle',
                            value: this.routerState.params.grupoContatoHandle
                        },
                        grupoContatoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new GrupoContatoEditActions.GetGrupoContatoFailed(err));
                    return caught;
                })
            ));

    /**
     * Save GrupoContato
     *
     * @type {Observable<any>}
     */
    saveGrupoContato: any = createEffect(() => this._actions
            .pipe(
                ofType<GrupoContatoEditActions.SaveGrupoContato>(GrupoContatoEditActions.SAVE_GRUPO_CONTATO),
                switchMap(action => this._grupoContatoService.save(action.payload).pipe(
                        mergeMap((response: GrupoContato) => [
                            new GrupoContatoEditActions.SaveGrupoContatoSuccess(),
                            new GrupoContatoListActions.ReloadGrupoContato(),
                            new AddData<GrupoContato>({data: [response], schema: grupoContatoSchema})
                        ])
                    )),
                catchError((err, caught) => {
                    this._store.dispatch(new GrupoContatoEditActions.SaveGrupoContatoFailed(err));
                    return caught;
                })
            ));

    /**
     * Save GrupoContato Success
     */
    saveGrupoContatoSuccess: any = createEffect(() => this._actions
            .pipe(
                ofType<GrupoContatoEditActions.SaveGrupoContatoSuccess>(GrupoContatoEditActions.SAVE_GRUPO_CONTATO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.grupoContatoHandle), 'listar')]).then();
                })
            ), {dispatch: false});
}

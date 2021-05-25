import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as GrupoContatoListActions from '../actions';

import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {GrupoContato} from '@cdk/models';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../@cdk/utils';

@Injectable()
export class GrupoContatoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _grupoContatoService: GrupoContatoService,
        public _loginService: LoginService,
        private _store: Store<State>
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
                ofType<GrupoContatoListActions.GetGrupoContato>(GrupoContatoListActions.GET_GRUPO_CONTATOS),
                switchMap(action => this._grupoContatoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap(response => [
                            new AddData<GrupoContato>({data: response['entities'], schema: grupoContatoSchema}),
                            new GrupoContatoListActions.GetGrupoContatoSuccess({
                                entitiesId: response['entities'].map(grupoContato => grupoContato.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError(err => of(new GrupoContatoListActions.GetGrupoContatoFailed(err)))
                    ))
            ));

    /**
     * Delete GrupoContato
     *
     * @type {Observable<any>}
     */
    deleteGrupoContato: any = createEffect(() => this._actions
            .pipe(
                ofType<GrupoContatoListActions.DeleteGrupoContato>(GrupoContatoListActions.DELETE_GRUPO_CONTATO),
                mergeMap(action => this._grupoContatoService.destroy(action.payload).pipe(
                        map(response => new GrupoContatoListActions.DeleteGrupoContatoSuccess(response.id)),
                        catchError(err => of(new GrupoContatoListActions.DeleteGrupoContatoFailed(
                                {
                                    [action.payload]: CdkUtils.errorsToString(err)
                                })
                            ))
                    ))
            ));
}

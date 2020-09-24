import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as UsuariosExternosListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';

import {AddData} from '../../../../../../../../@cdk/ngrx-normalizr';
import {Usuario} from '../../../../../../../../@cdk/models';
import {usuario as usuariosExternosSchema} from '../../../../../../../../@cdk/normalizr';
import {UsuarioService} from '../../../../../../../../@cdk/services/usuario.service';
import {getUsuariosExternosListLoaded} from '../selectors';


@Injectable()
export class UsuariosExternosListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _usuarioService: UsuarioService,
        private _loginService: LoginService,
        private _store: Store<State>
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
    getUsuariosExternosList: any =
        this._actions
            .pipe(
                ofType<UsuariosExternosListActions.GetUsuariosExternosList>(UsuariosExternosListActions.GET_USUARIOS_EXTERNOS_LIST),
                switchMap((action) => {
                    return this._usuarioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<Usuario>({data: response['entities'], schema: usuariosExternosSchema}),
                            new UsuariosExternosListActions.GetUsuariosExternosListSuccess({
                                entitiesId: response['entities'].map(usuario => usuario.id),
                                loaded: {
                                    id: 'usuariosExternosHandle',
                                    value: this.routerState.params.usuariosExternosHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new UsuariosExternosListActions.GetUsuariosExternosListFailed(err));
                        })
                    );
                })
            );


}

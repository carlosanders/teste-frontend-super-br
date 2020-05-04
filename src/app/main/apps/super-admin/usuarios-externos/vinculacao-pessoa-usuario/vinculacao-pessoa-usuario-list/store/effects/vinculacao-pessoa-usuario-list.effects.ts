import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../../store/reducers';
import * as VinculacaoPessoaUsuarioListActions from '../actions';
import {LoginService} from '../../../../../../../auth/login/login.service';
import {VinculacaoPessoaUsuarioService} from '@cdk/services/vinculacao-pessoa-usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {VinculacaoPessoaUsuario} from '@cdk/models';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from '@cdk/normalizr/vinculacao-pessoa-usuario.schema';


@Injectable()
export class VinculacaoPessoaUsuarioListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoPessoaUsuarioService: VinculacaoPessoaUsuarioService,
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
     * Get VinculacaoPessoaUsuario with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacaoPessoaUsuario: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuario>(VinculacaoPessoaUsuarioListActions.GET_VINCULACAO_PESSOA_USUARIO),
                switchMap((action) => {
                    return this._vinculacaoPessoaUsuarioService.query(
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
                            new AddData<VinculacaoPessoaUsuario>({data: response['entities'], schema: vinculacaoPessoaUsuarioSchema}),
                            new VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuarioSuccess({
                                entitiesId: response['entities'].map(vinculacaoPessoaUsuario => vinculacaoPessoaUsuario.id),
                                loaded: {
                                    id: 'vinculacaoPessoaUsuarioHandle',
                                    value: this.routerState.params.usuariosExternosHandler
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new VinculacaoPessoaUsuarioListActions.GetVinculacaoPessoaUsuarioFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete VinculacaoPessoaUsuario
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoPessoaUsuario: any =
        this._actions
            .pipe(
                ofType<VinculacaoPessoaUsuarioListActions.DeleteVinculacaoPessoaUsuario>(VinculacaoPessoaUsuarioListActions.DELETE_VINCULACAO_PESSOA_USUARIO),
                mergeMap((action) => {
                    return this._vinculacaoPessoaUsuarioService.destroy(action.payload).pipe(
                        map((response) => new VinculacaoPessoaUsuarioListActions.DeleteVinculacaoPessoaUsuarioSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new VinculacaoPessoaUsuarioListActions.DeleteVinculacaoPessoaUsuarioFailed(action.payload));
                        })
                    );
                })
            );
}
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as VinculacaoUsuarioEditActions from '../actions/vinculacao-usuario-edit.actions';
import * as VinculacaoUsuarioListActions from '../../../vinculacao-usuario-list/store/actions/vinculacao-usuario-list.actions';

import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from '@cdk/normalizr';
import {VinculacaoUsuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class VinculacaoUsuarioEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoUsuarioService: VinculacaoUsuarioService,
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
     * Get VinculacaoUsuario with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacaoUsuario: any =
        this._actions
            .pipe(
                ofType<VinculacaoUsuarioEditActions.GetVinculacaoUsuario>(VinculacaoUsuarioEditActions.GET_VINCULACAO_USUARIO),
                switchMap((action) => {
                    return this._vinculacaoUsuarioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<VinculacaoUsuario>({data: response['entities'], schema: vinculacaoUsuarioSchema}),
                    new VinculacaoUsuarioEditActions.GetVinculacaoUsuarioSuccess({
                        loaded: {
                            id: 'vinculacaoUsuarioHandle',
                            value: this.routerState.params.vinculacaoUsuarioHandle
                        },
                        vinculacaoUsuarioId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoUsuarioEditActions.GetVinculacaoUsuarioFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoUsuario
     * @type {Observable<any>}
     */
    @Effect()
    saveVinculacaoUsuario: any =
        this._actions
            .pipe(
                ofType<VinculacaoUsuarioEditActions.SaveVinculacaoUsuario>(VinculacaoUsuarioEditActions.SAVE_VINCULACAO_USUARIO),
                switchMap((action) => {
                    return this._vinculacaoUsuarioService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoUsuario) => [
                            new VinculacaoUsuarioEditActions.SaveVinculacaoUsuarioSuccess(),
                            new VinculacaoUsuarioListActions.ReloadVinculacoesUsuarios(),
                            new AddData<VinculacaoUsuario>({data: [response], schema: vinculacaoUsuarioSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacaoUsuarioEditActions.SaveVinculacaoUsuarioFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoUsuario Success
     */
    @Effect({dispatch: false})
    saveVinculacaoUsuarioSuccess: any =
        this._actions
            .pipe(
                ofType<VinculacaoUsuarioEditActions.SaveVinculacaoUsuarioSuccess>(VinculacaoUsuarioEditActions.SAVE_VINCULACAO_USUARIO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.vinculacaoUsuarioHandle), 'listar')]).then();
                })
            );
}

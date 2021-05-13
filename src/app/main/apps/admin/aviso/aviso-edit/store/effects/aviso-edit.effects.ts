import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AvisoEditActions from '../actions/aviso-edit.actions';
import * as AvisoListActions from '../../../aviso-list/store/actions/aviso-list.actions';

import {AvisoService} from '@cdk/services/aviso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {aviso as avisoSchema} from '@cdk/normalizr';
import {Aviso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class AvisoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _avisoService: AvisoService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get Aviso with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAviso: any =
        this._actions
            .pipe(
                ofType<AvisoEditActions.GetAviso>(AvisoEditActions.GET_AVISO),
                switchMap((action) => {
                    return this._avisoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            "aviso","vinculacoesAvisos","vinculacoesAvisos.setor","vinculacoesAvisos.modalidadeOrgaoCentral","vinculacoesAvisos.unidade","vinculacoesAvisos.setor.unidade"
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<Aviso>({data: response['entities'], schema: avisoSchema}),
                    new AvisoEditActions.GetAvisoSuccess({
                        loaded: {
                            id: 'avisoHandle',
                            value: this.routerState.params.avisoHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AvisoEditActions.GetAvisoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Aviso
     * @type {Observable<any>}
     */
    @Effect()
    saveAviso: any =
        this._actions
            .pipe(
                ofType<AvisoEditActions.SaveAviso>(AvisoEditActions.SAVE_AVISO),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._avisoService.save(action.payload, context).pipe(
                        mergeMap((response: Aviso) => [
                            new AvisoListActions.ReloadAviso(),
                            new AddData<Aviso>({data: [response], schema: avisoSchema}),
                            new AvisoEditActions.SaveAvisoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AvisoEditActions.SaveAvisoFailed(err));
                    return caught;
                })
            );

    /**
     * Update Aviso
     * @type {Observable<any>}
     */
    @Effect()
    updateAviso: any =
        this._actions
            .pipe(
                ofType<AvisoEditActions.UpdateAviso>(AvisoEditActions.UPDATE_AVISO),
                switchMap((action) => {
                    return this._avisoService.patch(action.payload.aviso, action.payload.changes).pipe(
                        mergeMap((response: Aviso) => [
                            new AvisoListActions.ReloadAviso(),
                            new AddData<Aviso>({data: [response], schema: avisoSchema}),
                            new AvisoEditActions.UpdateAvisoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AvisoEditActions.UpdateAvisoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Aviso Success
     */
    @Effect({dispatch: false})
    saveAvisoSuccess: any =
        this._actions
            .pipe(
                ofType<AvisoEditActions.SaveAvisoSuccess>(AvisoEditActions.SAVE_AVISO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['apps/admin/avisos/listar']).then();
                })
            );
}

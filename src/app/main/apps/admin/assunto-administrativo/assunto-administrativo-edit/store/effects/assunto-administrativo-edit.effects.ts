import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AssuntoAdministrativoEditActions from '../actions/assunto-administrativo-edit.actions';
import * as AssuntoAdministrativoListActions from '../../../assunto-administrativo-list/store/actions/assunto-administrativo-list.actions';

import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr/assunto-administrativo.schema';
import {AssuntoAdministrativo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class AssuntoAdministrativoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _AssuntoAdministrativoService: AssuntoAdministrativoService,
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
     * Get AssuntoAdministrativo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAssuntoAdministrativo: any =
        this._actions
            .pipe(
                ofType<AssuntoAdministrativoEditActions.GetAssuntoAdministrativo>(AssuntoAdministrativoEditActions.GET_ASSUNTO_ADMINISTRATIVO),
                switchMap((action) => {
                    return this._AssuntoAdministrativoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
                switchMap(response => [
                    new AddData<AssuntoAdministrativo>({data: response['entities'], schema: assuntoAdministrativoSchema}),
                    new AssuntoAdministrativoEditActions.GetAssuntoAdministrativoSuccess({
                        loaded: {
                            id: 'assuntoAdministrativoHandle',
                            value: this.routerState.params.assuntoAdministrativoHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssuntoAdministrativoEditActions.GetAssuntoAdministrativoFailed(err));
                    return caught;
                })
            );

    /**
     * Save AssuntoAdministrativo
     * @type {Observable<any>}
     */
    @Effect()
    saveAssuntoAdministrativo: any =
        this._actions
            .pipe(
                ofType<AssuntoAdministrativoEditActions.SaveAssuntoAdministrativo>(AssuntoAdministrativoEditActions.SAVE_ASSUNTO_ADMINISTRATIVO),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._AssuntoAdministrativoService.save(action.payload, context).pipe(
                        mergeMap((response: AssuntoAdministrativo) => [
                            new AssuntoAdministrativoListActions.ReloadAssuntoAdministrativo(),
                            new AddData<AssuntoAdministrativo>({data: [response], schema: assuntoAdministrativoSchema}),
                            new AssuntoAdministrativoEditActions.SaveAssuntoAdministrativoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssuntoAdministrativoEditActions.SaveAssuntoAdministrativoFailed(err));
                    return caught;
                })
            );

    /**
     * Update AssuntoAdministrativo
     * @type {Observable<any>}
     */
    @Effect()
    updateAssuntoAdministrativo: any =
        this._actions
            .pipe(
                ofType<AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativo>(AssuntoAdministrativoEditActions.UPDATE_ASSUNTO_ADMINISTRATIVO),
                switchMap((action) => {
                    debugger
                    return this._AssuntoAdministrativoService.patch(action.payload.AssuntoAdministrativo, action.payload.changes).pipe(
                        mergeMap((response: AssuntoAdministrativo) => [
                            new AssuntoAdministrativoListActions.ReloadAssuntoAdministrativo(),
                            new AddData<AssuntoAdministrativo>({data: [response], schema: assuntoAdministrativoSchema}),
                            new AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativoFailed(err));
                    return caught;
                })
            );

    /**
     * Save AssuntoAdministrativo Success
     */
    @Effect({dispatch: false})
    saveAssuntoAdministrativoSuccess: any =
        this._actions
            .pipe(
                ofType<AssuntoAdministrativoEditActions.SaveAssuntoAdministrativoSuccess>(AssuntoAdministrativoEditActions.SAVE_ASSUNTO_ADMINISTRATIVO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['/apps/admin/assuntos/listar']).then();
                })
            );


    /**
     * Save AssuntoAdministrativo Success
     */
    @Effect({dispatch: false})
    updateAssuntoAdministrativoSuccess: any =
        this._actions
            .pipe(
                ofType<AssuntoAdministrativoEditActions.UpdateAssuntoAdministrativoSuccess>(AssuntoAdministrativoEditActions.UPDATE_ASSUNTO_ADMINISTRATIVO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['/apps/admin/assuntos/listar']).then();
                })
            );


}

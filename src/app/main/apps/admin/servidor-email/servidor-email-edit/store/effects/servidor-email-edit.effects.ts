import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ServidorEmailEditActions from '../actions/servidor-email-edit.actions';
import * as ServidorEmailListActions from '../../../servidor-email-list/store/actions/servidor-email-list.actions';

import {ServidorEmailService} from '@cdk/services/servidor-email.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {servidorEmail as servidorEmailSchema} from '@cdk/normalizr';
import {ServidorEmail} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ServidorEmailEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _servidorEmailService: ServidorEmailService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get ServidorEmail with router parameters
     *
     * @type {Observable<any>}
     */
    getServidorEmail: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ServidorEmailEditActions.GetServidorEmail>(ServidorEmailEditActions.GET_SERVIDOR_EMAIL),
                switchMap(action => this._servidorEmailService.query(
                    JSON.stringify(action.payload),
                    1,
                    0,
                    JSON.stringify({}),
                    JSON.stringify([
                        'populateAll'
                    ]),
                    JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<ServidorEmail>({data: response['entities'], schema: servidorEmailSchema}),
                    new ServidorEmailEditActions.GetServidorEmailSuccess({
                        loaded: {
                            id: 'servidorEmailHandle',
                            value: this.routerState.params.servidorEmailHandle
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ServidorEmailEditActions.GetServidorEmailFailed(err));
                    return caught;
                })
            )
    });

    /**
     * Save ServidorEmail
     *
     * @type {Observable<any>}
     */
    saveServidorEmail: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ServidorEmailEditActions.SaveServidorEmail>(ServidorEmailEditActions.SAVE_SERVIDOR_EMAIL),
                switchMap(action => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._servidorEmailService.save(action.payload.servidorEmail, context).pipe(
                        mergeMap((response: ServidorEmail) => [
                            new ServidorEmailEditActions.SaveServidorEmailSuccess(response),
                            new ServidorEmailListActions.ReloadServidorEmail(),
                            new AddData<ServidorEmail>({data: [response], schema: servidorEmailSchema})
                        ]),
                        catchError((err) => {
                            return of(new ServidorEmailEditActions.SaveServidorEmailFailed(err));
                        })
                    )
                })
            )
    });

    /**
     * Update ServidorEmail
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateServidorEmail: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ServidorEmailEditActions.UpdateServidorEmail>(ServidorEmailEditActions.UPDATE_SERVIDOR_EMAIL),
                switchMap(action => this._servidorEmailService.patch(action.payload.servidorEmail, action.payload.changes).pipe(
                    mergeMap((response: ServidorEmail) => [
                        new ServidorEmailListActions.ReloadServidorEmail(),
                        new AddData<ServidorEmail>({data: [response], schema: servidorEmailSchema}),
                        new ServidorEmailEditActions.UpdateServidorEmailSuccess(response)
                    ])
                )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ServidorEmailEditActions.UpdateServidorEmailFailed(err));
                    return caught;
                })
            )
    });

    /**
     * Save ServidorEmail Success
     */
    saveServidorEmailSuccess: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ServidorEmailEditActions.SaveServidorEmailSuccess>(ServidorEmailEditActions.SAVE_SERVIDOR_EMAIL_SUCCESS),
                tap(_=> {
                    this._router.navigate(['apps/admin/servidor-email/listar']).then();
                })
            )
    }, {dispatch: false});

}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ContaEmailEditActions from '../actions/contas-email-edit.actions';
import * as ContaEmailListActions from '../../../contas-email-list/store/actions/contas-email-list.actions';

import {ContaEmailService} from '@cdk/services/conta-email.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {contaEmail as contaEmailSchema} from '@cdk/normalizr';
import {ContaEmail} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ContasEmailEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _contaEmailService: ContaEmailService,
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
     * Get ContaEmail with router parameters
     *
     * @type {Observable<any>}
     */
    getContaEmail: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContaEmailEditActions.GetContaEmail>(ContaEmailEditActions.GET_CONTA_EMAIL),
                switchMap(action => this._contaEmailService.query(
                    JSON.stringify(action.payload),
                    1,
                    0,
                    JSON.stringify({}),
                    JSON.stringify([
                        'populateAll'
                    ]),
                    JSON.stringify({isAdmin: true}))),
                switchMap(response => [
                    new AddData<ContaEmail>({data: response['entities'], schema: contaEmailSchema}),
                    new ContaEmailEditActions.GetContaEmailSuccess({
                        loaded: {
                            id: 'contaEmailHandle',
                            value: this.routerState.params['contaEmailHandle']
                        },
                        entityId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ContaEmailEditActions.GetContaEmailFailed(err));
                    return caught;
                })
            )
    });

    /**
     * Save ContaEmail
     *
     * @type {Observable<any>}
     */
    saveContaEmail: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContaEmailEditActions.SaveContaEmail>(ContaEmailEditActions.SAVE_CONTA_EMAIL),
                switchMap(action => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._contaEmailService.save(action.payload.contaEmail, context).pipe(
                        mergeMap((response: ContaEmail) => [
                            new ContaEmailEditActions.SaveContaEmailSuccess(response),
                            new ContaEmailListActions.ReloadContaEmail(),
                            new AddData<ContaEmail>({data: [response], schema: contaEmailSchema})
                        ]),
                        catchError((err) => {
                            return of(new ContaEmailEditActions.SaveContaEmailFailed(err));
                        })
                    )
                })
            )
    });

    /**
     * Update ContaEmail
     *
     * @type {Observable<any>}
     */
    updateContaEmail: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContaEmailEditActions.UpdateContaEmail>(ContaEmailEditActions.UPDATE_CONTA_EMAIL),
                switchMap(action => this._contaEmailService.patch(action.payload.contaEmail, action.payload.changes).pipe(
                    mergeMap((response: ContaEmail) => [
                        new ContaEmailListActions.ReloadContaEmail(),
                        new AddData<ContaEmail>({data: [response], schema: contaEmailSchema}),
                        new ContaEmailEditActions.UpdateContaEmailSuccess(response)
                    ])
                )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ContaEmailEditActions.UpdateContaEmailFailed(err));
                    return caught;
                })
            )
    });

    /**
     * Save ContaEmail Success
     */
    saveContaEmailSuccess: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ContaEmailEditActions.SaveContaEmailSuccess>(ContaEmailEditActions.SAVE_CONTA_EMAIL_SUCCESS),
                tap(_=> {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.contaEmailHandle), 'listar')]).then();
                })
            )
    }, {dispatch: false});

}

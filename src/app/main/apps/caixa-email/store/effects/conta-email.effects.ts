import {AddChildData, AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    contaEmail as contaEmailSchema
} from '@cdk/normalizr';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {LoginService} from 'app/main/auth/login/login.service';

import {Observable, of} from 'rxjs';
import {buffer, catchError, concatMap, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';

import {ContaEmail} from '@cdk/models';
import {ContaEmailService} from '@cdk/services/conta-email.service';


import {Router} from '@angular/router';

import * as fromStore from '../index';

@Injectable()
export class ContaEmailEffects {

    routerState: any;

    constructor(private _actions: Actions,
                public _loginService: LoginService,
                private _store: Store<State>,
                private _contaEmailService: ContaEmailService,
                private _router: Router)
    {
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
        });
    }

    getContaEmail: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<fromStore.GetContaEmail>(fromStore.GET_CONTA_EMAIL),
                switchMap(action => this._contaEmailService.query(
                    JSON.stringify({
                        ...action.payload.filter,
                        ...action.payload.gridFilter,
                        ...action.payload.listFilter,
                    }),
                    action.payload.limit,
                    action.payload.offset,
                    JSON.stringify(action.payload.sort),
                    JSON.stringify(action.payload.populate),
                    JSON.stringify(action.payload.context))
                ),
                concatMap(response => [
                    new AddData<ContaEmail>({data: response['entities'], schema: contaEmailSchema}),
                    new fromStore.GetContaEmailSuccess({
                        entitiesId: response['entities'].map(entity => entity.id),
                        total: response['total']
                    })
                ]),
                catchError((err) => {
                    return of(new fromStore.GetContaEmailFailed(err));
                })
            );
    });

    saveEmailProcessoForm: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<fromStore.SaveEmailProcessoForm>(fromStore.SAVE_EMAIL_PROCESSO_FORM),
                switchMap(action => this._contaEmailService.saveEmailProcessoForm(
                    action.payload.contaEmail,
                    action.payload.emailProcessoForm,
                ).pipe(
                    tap((response) => {
                        console.log('effects processo form', action.payload)
                        if (action.payload.emailProcessoForm.tipo === 'novo_processo') {
                            this._store.dispatch(new fromStore.SetActiveCard('mail-list'));
                            this._router.navigate([
                                `apps/processo/${response.id}/editar/dados-basicos`
                            ]);
                        } else {
                            this._store.dispatch(new fromStore.SetActiveCard('mail-list'));
                            this._router.navigate([
                                `apps/processo/${response.id}/visualizar/latest`
                            ]);
                        }
                    })
                )),
                concatMap(response => [
                    new fromStore.SaveEmailProcessoFormSuccess(response)
                ]),
                catchError((err) => {
                    return of(new fromStore.SaveEmailProcessoFormFailed(err));
                })
            );
    });

}

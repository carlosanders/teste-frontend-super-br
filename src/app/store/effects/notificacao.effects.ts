import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as NotificacaoListActions from '../actions';

import {NotificacaoService} from '@cdk/services/notificacao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Notificacao} from '@cdk/models';
import {notificacao as notificacaoSchema} from '@cdk/normalizr/notificacao.schema';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class NotificacaoEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _notificacaoService: NotificacaoService,
        public _loginService: LoginService,
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
     * Get Notificacoes with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getNotificacoes: any =
        this._actions
            .pipe(
                ofType<NotificacaoListActions.GetNotificacoes>(NotificacaoListActions.GET_NOTIFICACOES),
                switchMap((action) => {
                    console.log('******************************getNotificacoes');
                    return this._notificacaoService.query(
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
                            new AddData<Notificacao>({data: response['entities'], schema: notificacaoSchema}),
                            new NotificacaoListActions.GetNotificacoesSuccess({
                                notificacoes: response['entities'].map(notificacao => notificacao.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this._loginService.getUserProfile().id
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new NotificacaoListActions.GetNotificacoesFailed(err));
                        })
                    );
                })
            );

    /**
     * ToggleLida Notificacao
     * @type {Observable<any>}
     */
    @Effect()
    toggleLidaNotificacao: any =
        this._actions
            .pipe(
                ofType<NotificacaoListActions.ToggleLidaNotificacao>(NotificacaoListActions.TOGGLE_LIDA_NOTIFICACAO),
                mergeMap((action) => {
                    return this._notificacaoService.toggleLida(action.payload).pipe(
                        mergeMap((response) => [
                            new UpdateData<Notificacao>({id: response.id, schema: notificacaoSchema, changes: {dataHoraLeitura: response.dataHoraLeitura}}),
                            new NotificacaoListActions.ToggleLidaNotificacaoSuccess(response.id)
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new NotificacaoListActions.ToggleLidaNotificacaoFailed(action.payload));
                        })
                    );
                })
            );
}
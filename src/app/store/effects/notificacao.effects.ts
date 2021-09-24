import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as NotificacaoListActions from '../actions';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Notificacao} from '@cdk/models';
import {notificacao as notificacaoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class NotificacaoEffect {
    routerState: any;
    /**
     * Get Notificacoes with router parameters
     *
     * @type {Observable<any>}
     */
    getNotificacoes: any = createEffect(() => this._actions.pipe(
        ofType<NotificacaoListActions.GetNotificacoes>(NotificacaoListActions.GET_NOTIFICACOES),
        switchMap((action) => {
            if (this._loginService && this._loginService.getUserProfile() && this._loginService.getUserProfile().id != null) {
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
                    mergeMap(response => [
                        new AddData<Notificacao>({data: response['entities'], schema: notificacaoSchema}),
                        new NotificacaoListActions.GetNotificacoesSuccess({
                            entitiesId: response['entities'].map(notificacao => notificacao.id),
                            loaded: {
                                id: 'usuarioHandle',
                                value: this._loginService?.getUserProfile()?.id
                            },
                            total: response['total']
                        }),
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new NotificacaoListActions.GetNotificacoesFailed(err));
                    })
                );
            }
        })
    ));
    /**
     * ToggleLida Notificacao
     *
     * @type {Observable<any>}
     */
    toggleLidaNotificacao: any = createEffect(() => this._actions.pipe(
        ofType<NotificacaoListActions.ToggleLidaNotificacao>(NotificacaoListActions.TOGGLE_LIDA_NOTIFICACAO),
        mergeMap(action => this._notificacaoService.toggleLida(action.payload).pipe(
            mergeMap(response => [
                new NotificacaoListActions.ReloadNotificacoes(),
                new UpdateData<Notificacao>({
                    id: response.id,
                    schema: notificacaoSchema,
                    changes: {dataHoraLeitura: response.dataHoraLeitura}
                }),
                new NotificacaoListActions.ToggleLidaNotificacaoSuccess(response.id),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new NotificacaoListActions.ToggleLidaNotificacaoFailed(action.payload));
            })
        ))
    ));

    marcarTodasComoLida: any = createEffect(() => this._actions.pipe(
        ofType<NotificacaoListActions.ButtonTodasNotificacoesLidas>(NotificacaoListActions.BUTTON_TODAS_NOTIFICACOES_LIDAS),
        tap(() => this._notificacaoService
            .marcarTodas()
            .subscribe())
    ), {dispatch: false});

    removeAllNotificacao: any = createEffect(() => this._actions.pipe(
        ofType<NotificacaoListActions.RemoveAllNotificacao>(NotificacaoListActions.REMOVE_ALL_NOTIFICACAO),
        mergeMap(() => this._notificacaoService.excluirTodas().pipe(
            mergeMap(() => [
                new NotificacaoListActions.RemoveAllNotificacaoSuccess()
            ]),
            catchError((err) => {
                console.log(err);
                return of(new NotificacaoListActions.RemoveAllNotificacaoFailed());
            })
        ))
    ));

    removeNotificacao: any = createEffect(() => this._actions.pipe(
        ofType<NotificacaoListActions.RemoveNotificacao>(NotificacaoListActions.REMOVE_NOTIFICACAO),
        mergeMap(action => this._notificacaoService.destroy(action.payload).pipe(
            mergeMap(response => [
                new NotificacaoListActions.RemoveNotificacaoSuccess(response.id),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new NotificacaoListActions.RemoveNotificacaoFailed());
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _notificacaoService: NotificacaoService,
        public _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

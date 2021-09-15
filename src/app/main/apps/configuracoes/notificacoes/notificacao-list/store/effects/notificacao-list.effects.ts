import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as NotificacaoListActions from '../actions';

import {NotificacaoService} from '@cdk/services/notificacao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Notificacao} from '@cdk/models';
import {notificacao as notificacaoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../@cdk/utils';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class NotificacaoListEffect {
    routerState: any;
    /**
     * Get Notificacoes with router parameters
     *
     * @type {Observable<any>}
     */
    getNotificacoes: any = createEffect(() => this._actions.pipe(
        ofType<NotificacaoListActions.GetNotificacoes>(NotificacaoListActions.GET_NOTIFICACOES),
        switchMap(action => this._notificacaoService.query(
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
                        value: this._loginService.getUserProfile().id
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new NotificacaoListActions.GetNotificacoesFailed(err));
            })
        ))
    ));
    /**
     * Delete Notificacao
     *
     * @type {Observable<any>}
     */
    deleteNotificacao: Observable<NotificacaoListActions.NotificacaoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<NotificacaoListActions.DeleteNotificacao>(NotificacaoListActions.DELETE_NOTIFICACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'notificação',
            content: 'Apagando a notificação id ' + action.payload.notificacaoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._notificacaoService.destroy(action.payload.notificacaoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'notificação',
                    content: 'Notificação id ' + action.payload.notificacaoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Notificacao>({
                    id: response.id,
                    schema: notificacaoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new NotificacaoListActions.DeleteNotificacaoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.notificacaoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'notificação',
                    content: 'Erro ao apagar a notificação id ' + action.payload.notificacaoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new NotificacaoListActions.DeleteNotificacaoFailed(payload));
            })
        ), 25)
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
                new UpdateData<Notificacao>({
                    id: response.id,
                    schema: notificacaoSchema,
                    changes: {dataHoraLeitura: response.dataHoraLeitura}
                }),
                new NotificacaoListActions.ToggleLidaNotificacaoSuccess(response.id)
            ]),
            catchError((err) => {
                console.log(err);
                return of(new NotificacaoListActions.ToggleLidaNotificacaoFailed(
                    {
                        [action.payload]: CdkUtils.errorsToString(err)
                    })
                );
            })
        ), 25)
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

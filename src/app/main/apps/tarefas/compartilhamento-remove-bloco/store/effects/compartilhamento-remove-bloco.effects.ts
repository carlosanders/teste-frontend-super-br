import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Compartilhamento} from '@cdk/models';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {CdkUtils} from '@cdk/utils';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {getRouterState, RouterStateUrl, State} from 'app/store/reducers';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as CompartilhamentoRemoveBlocoActions from '../actions/compartilhamento-remove-bloco.actions';

@Injectable()
export class CompartilhamentoRemoveBlocoEffect {

    routerState: RouterStateUrl;

    deleteCompartilhamento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoRemoveBlocoActions.DeleteCompartilhamento>(CompartilhamentoRemoveBlocoActions.DELETE_COMPARTILHAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'compartilhamento',
            content: 'Apagando o compartilhamento id ' + action.payload.compartilhamentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo
        }))),
        mergeMap(action => this._compartilhamentoService.destroy(action.payload.compartilhamentoId).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'compartilhamento',
                content: 'Compartilhamento id ' + action.payload.compartilhamentoId + ' apagado com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId,
                redo: 'inherent'
            }))),
            mergeMap((response: Compartilhamento) => [
                new CompartilhamentoRemoveBlocoActions.DeleteCompartilhamentoSuccess(action.payload),
                new UpdateData<Compartilhamento>({
                    id: response.id,
                    schema: compartilhamentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'compartilhamento',
                    content: 'Erro ao apagar o compartilhamento id ' + action.payload.compartilhamentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
                return of(new CompartilhamentoRemoveBlocoActions.DeleteCompartilhamentoFailed({
                    id: action.payload.compartilhamentoId,
                    error: CdkUtils.errorsToString(err)
                }));
            })
        ), 25)
    ));

    getCompartilhamentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompartilhamentoRemoveBlocoActions.GetCompartilhamentos>(CompartilhamentoRemoveBlocoActions.GET_COMPARTILHAMENTOS),
        mergeMap(action => this._compartilhamentoService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset ?? 0,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(action.payload.context)
            ).pipe(
            mergeMap(response => [
                new AddData<Compartilhamento>({data: response['entities'], schema: compartilhamentoSchema}),
                new CompartilhamentoRemoveBlocoActions.GetCompartilhamentosSuccess({
                    entitiesId: response['entities'].map((compartilhamento) => compartilhamento.id),
                    loaded: [this.routerState.params['generoHandle'], this.routerState.params['typeHandle'], this.routerState.params['targetHandle']].join('_'),
                    total: response['total'],
                }),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new CompartilhamentoRemoveBlocoActions.GetCompartilhamentosFailed(err));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _compartilhamentoService: CompartilhamentoService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}

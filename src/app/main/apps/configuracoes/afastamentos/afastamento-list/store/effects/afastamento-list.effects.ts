import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AfastamentoListActions from '../actions';

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Afastamento} from '@cdk/models';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class AfastamentoListEffect {

    routerState: any;
    /**
     * Get Afastamentos with router parameters
     *
     * @type {Observable<any>}
     */
    getAfastamentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AfastamentoListActions.GetAfastamentos>(AfastamentoListActions.GET_AFASTAMENTOS),
        switchMap(action => this._afastamentoService.query(
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
                new AddData<Afastamento>({data: response['entities'], schema: afastamentoSchema}),
                new AfastamentoListActions.GetAfastamentosSuccess({
                    entitiesId: response['entities'].map(afastamento => afastamento.id),
                    loaded: {
                        id: 'usuarioHandle',
                        value: this._loginService.getUserProfile().id
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new AfastamentoListActions.GetAfastamentosFailed(err));
            })
        ))
    ));
    /**
     * Delete Afastamento
     *
     * @type {Observable<any>}
     */
    deleteAfastamento: Observable<AfastamentoListActions.AfastamentoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AfastamentoListActions.DeleteAfastamento>(AfastamentoListActions.DELETE_AFASTAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'afastamento',
            content: 'Apagando o afastamento id ' + action.payload.afastamentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._afastamentoService.destroy(action.payload.afastamentoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'afastamento',
                    content: 'Afastamento id ' + action.payload.afastamentoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Afastamento>({
                    id: response.id,
                    schema: afastamentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new AfastamentoListActions.DeleteAfastamentoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.afastamentoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'afastamento',
                    content: 'Erro ao apagar o afastamento id ' + action.payload.afastamentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AfastamentoListActions.DeleteAfastamentoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _afastamentoService: AfastamentoService,
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

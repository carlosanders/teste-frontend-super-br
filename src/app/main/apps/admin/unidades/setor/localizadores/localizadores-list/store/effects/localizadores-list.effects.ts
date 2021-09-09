import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RootLocalizadoresListActions from '../actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class LocalizadoresListEffects {
    routerState: any;
    /**
     * Get Localizadores with router parameters
     *
     * @type {Observable<any>}
     */
    getLocalizadores: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RootLocalizadoresListActions.GetLocalizadores>(RootLocalizadoresListActions.GET_LOCALIZADORES),
        switchMap(action => this._localizadorService.query(
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
                new AddData<Localizador>({data: response['entities'], schema: localizadorSchema}),
                new RootLocalizadoresListActions.GetLocalizadoresSuccess({
                    entitiesId: response['entities'].map(localizador => localizador.id),
                    loaded: {
                        id: 'setorHandle',
                        value: this.routerState.params['setorHandle']
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new RootLocalizadoresListActions.GetLocalizadoresFailed(err));
            })
        ))
    ));
    /**
     * Delete Localizador
     *
     * @type {Observable<any>}
     */
    deleteLocalizador: Observable<RootLocalizadoresListActions.RootLocalizadoresListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RootLocalizadoresListActions.DeleteLocalizador>(RootLocalizadoresListActions.DELETE_LOCALIZADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'localizador',
            content: 'Apagando o localizador id ' + action.payload.localizadorId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._localizadorService.destroy(action.payload.localizadorId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'localizador',
                    content: 'Localizador id ' + action.payload.localizadorId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Localizador>({
                    id: response.id,
                    schema: localizadorSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RootLocalizadoresListActions.DeleteLocalizadorSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.localizadorId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'localizador',
                    content: 'Erro ao apagar o localizador id ' + action.payload.localizadorId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RootLocalizadoresListActions.DeleteLocalizadorFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
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

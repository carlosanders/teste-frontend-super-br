import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as LocalizadorListActions from '../actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class LocalizadorListEffects {
    routerState: any;
    /**
     * Get Localizadores with router parameters
     *
     * @type {Observable<any>}
     */
    getLocalizadores: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LocalizadorListActions.GetLocalizadores>(LocalizadorListActions.GET_LOCALIZADORES),
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
                new LocalizadorListActions.GetLocalizadoresSuccess({
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
                return of(new LocalizadorListActions.GetLocalizadoresFailed(err));
            })
        ))
    ));
    /**
     * Delete Localizador
     *
     * @type {Observable<any>}
     */
    deleteLocalizador: Observable<LocalizadorListActions.LocalizadorListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<LocalizadorListActions.DeleteLocalizador>(LocalizadorListActions.DELETE_LOCALIZADOR),
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
                return new LocalizadorListActions.DeleteLocalizadorSuccess(response.id);
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
                return of(new LocalizadorListActions.DeleteLocalizadorFailed(payload));
            })
        ), 25)
    ));
    /**
     * Save Localizador
     *
     * @type {Observable<any>}
     */
    saveLocalizador: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LocalizadorListActions.SaveLocalizador>(LocalizadorListActions.SAVE_LOCALIZADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'localizador',
            content: 'Salvando o localizador ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._localizadorService.save(action.payload.localizador).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'localizador',
                content: 'Localizador id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Localizador) => [
                new LocalizadorListActions.SaveLocalizadorSuccess(),
                new AddData<Localizador>({data: [response], schema: localizadorSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'localizador',
                    content: 'Erro ao salvar o localizador!',
                    status: 2, // erro
                }));
                return of(new LocalizadorListActions.SaveLocalizadorFailed(err));
            })
        ))
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

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as LocalizadorListActions from '../actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from '../../../../../../../../@cdk/utils';

@Injectable()
export class LocalizadorListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
        public _loginService: LoginService,
        private _store: Store<State>
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
     * Get Localizadores with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getLocalizadores: any =
        this._actions
            .pipe(
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
            );

    /**
     * Delete Localizador
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteLocalizador: Observable<LocalizadorListActions.LocalizadorListActionsAll> =
        this._actions
            .pipe(
                ofType<LocalizadorListActions.DeleteLocalizador>(LocalizadorListActions.DELETE_LOCALIZADOR),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'localizador',
                        content: 'Apagando a localizador id ' + action.payload.localizadorId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._localizadorService.destroy(action.payload.localizadorId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'localizador',
                                content: 'Localizador id ' + action.payload.localizadorId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Localizador>({
                                id: response.id,
                                schema: localizadorSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
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
                                content: 'Erro ao apagar a localizador id ' + action.payload.localizadorId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new LocalizadorListActions.DeleteLocalizadorFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Save Localizador
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveLocalizador: any =
        this._actions
            .pipe(
                ofType<LocalizadorListActions.SaveLocalizador>(LocalizadorListActions.SAVE_LOCALIZADOR),
                switchMap(action => this._localizadorService.save(action.payload.localizador).pipe(
                        mergeMap((response: Localizador) => [
                            new LocalizadorListActions.SaveLocalizadorSuccess(),  new OperacoesActions.Resultado({
                                type: 'localizador',
                                content: `Localizador id ${response.id} editada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new LocalizadorListActions.SaveLocalizadorFailed(err));
                        })
                    ))
            );
}

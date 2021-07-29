import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AfastamentosListActions from '../actions';

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Afastamento} from '@cdk/models/afastamento.model';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class AfastamentosListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _afastamentoService: AfastamentoService,
        private _loginService: LoginService,
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
     * Get Afastamentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAfastamentos: any =
        this._actions
            .pipe(
                ofType<AfastamentosListActions.GetAfastamentos>(AfastamentosListActions.GET_AFASTAMENTOS),
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
                            new AfastamentosListActions.GetAfastamentosSuccess({
                                entitiesId: response['entities'].map(afastamento => afastamento.id),
                                loaded: {
                                    id: 'usuarioHandle',
                                    value: this.routerState.params.usuarioHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AfastamentosListActions.GetAfastamentosFailed(err));
                        })
                    ))
            );

    /**
     * Delete Afastamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteAfastamento: Observable<AfastamentosListActions.AfastamentosListActionsAll> =
        this._actions
            .pipe(
                ofType<AfastamentosListActions.DeleteAfastamento>(AfastamentosListActions.DELETE_AFASTAMENTO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'afastamento',
                        content: 'Apagando a afastamento id ' + action.payload.afastamentoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._afastamentoService.destroy(action.payload.afastamentoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'afastamento',
                                content: 'Afastamento id ' + action.payload.afastamentoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Afastamento>({
                                id: response.id,
                                schema: afastamentoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new AfastamentosListActions.DeleteAfastamentoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.afastamentoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'afastamento',
                                content: 'Erro ao apagar a afastamento id ' + action.payload.afastamentoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new AfastamentosListActions.DeleteAfastamentoFailed(payload));
                        })
                    );
                }, 25)
            );
}

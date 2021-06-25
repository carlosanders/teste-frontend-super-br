import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AcompanhamentoListActions from '../actions';

import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Compartilhamento} from '@cdk/models';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUtils} from '../../../../../../../../@cdk/utils';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class AcompanhamentoListEffect {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _acompanhamentoService: AcompanhamentoService,
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
     * Get Acompanhamentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAcompanhamentos: any =
        this._actions
            .pipe(
                ofType<AcompanhamentoListActions.GetAcompanhamentos>(AcompanhamentoListActions.GET_ACOMPANHAMENTOS),
                switchMap(action => this._acompanhamentoService.query(
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
                                    new AddData<Compartilhamento>({
                                        data: response['entities'],
                                        schema: acompanhamentoSchema
                                    }),
                                    new AcompanhamentoListActions.GetAcompanhamentosSuccess({
                                        entitiesId: response['entities'].map(acompanhamento => acompanhamento.id),
                                        loaded: {
                                            id: 'usuarioHandle',
                                            value: this._loginService.getUserProfile().id
                                        },
                                        total: response['total']
                                    })
                                ]
                        ),
                        catchError((err) => {
                            console.log(err);
                            return of(new AcompanhamentoListActions.GetAcompanhamentosFailed(err));
                        })
                    ))
            );

    /**
     * Delete Acompanhamento
     *
     * @type {Observable<any>}
     */
    @Effect()
     deleteAcompanhamento: Observable<AcompanhamentoListActions.AcompanhamentoListActionsAll> =
        this._actions
            .pipe(
                ofType<AcompanhamentoListActions.DeleteAcompanhamento>(AcompanhamentoListActions.DELETE_ACOMPANHAMENTO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'acompanhamento',
                        content: 'Apagando a acompanhamento id ' + action.payload.acompanhamentoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._acompanhamentoService.destroy(action.payload.acompanhamentoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'acompanhamento',
                                content: 'Acompanhamento id ' + action.payload.acompanhamentoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Compartilhamento>({
                                id: response.id,
                                schema: acompanhamentoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new AcompanhamentoListActions.DeleteAcompanhamentoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.acompanhamentoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'acompanhamento',
                                content: 'Erro ao apagar a acompanhamento id ' + action.payload.acompanhamentoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new AcompanhamentoListActions.DeleteAcompanhamentoFailed(payload));
                        })
                    );
                }, 25)
            );
}

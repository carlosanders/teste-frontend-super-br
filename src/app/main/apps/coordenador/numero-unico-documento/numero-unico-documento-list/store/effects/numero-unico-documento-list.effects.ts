import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as NumeroUnicoDocumentoListActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {NumeroUnicoDocumento} from '@cdk/models';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class NumeroUnicoDocumentoListEffect {

    routerState: any;

    id = '';
    value = '';

    constructor(
        private _actions: Actions,
        private _numeroUnicoDocumentoService: NumeroUnicoDocumentoService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.id = 'unidadeHandle';
                    if (this.routerState.params['setorHandle']) {
                        this.id = 'setorHandle';
                        this.value = this.routerState.params['setorHandle'];
                    } else if (this.routerState.params['unidadeHandle']) {
                        this.value = this.routerState.params['unidadeHandle'];
                    } else {
                        this.value = this.routerState.params['entidadeHandle'];
                    }
                }
            });
    }

    /**
     * Get NumerosUnicosDocumentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getNumerosUnicosDocumentos: any =
        this._actions
            .pipe(
                ofType<NumeroUnicoDocumentoListActions.GetNumerosUnicosDocumentos>(NumeroUnicoDocumentoListActions.GET_NUMEROS_UNICOS_DOCUMENTOS),
                switchMap(action => this._numeroUnicoDocumentoService.query(
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
                            new AddData<NumeroUnicoDocumento>({data: response['entities'], schema: numeroUnicoDocumentoSchema}),
                            new NumeroUnicoDocumentoListActions.GetNumerosUnicosDocumentosSuccess({
                                entitiesId: response['entities'].map(numeroUnicoDocumento => numeroUnicoDocumento.id),
                                loaded: {
                                    id: this.id,
                                    value: this.value
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new NumeroUnicoDocumentoListActions.GetNumerosUnicosDocumentosFailed(err));
                        })
                    ))
            );

    /**
     * Delete NumeroUnicoDocumento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteNumeroUnicoDocumento: Observable<NumeroUnicoDocumentoListActions.NumeroUnicoDocumentoListActionsAll> =
        this._actions
            .pipe(
                ofType<NumeroUnicoDocumentoListActions.DeleteNumeroUnicoDocumento>(NumeroUnicoDocumentoListActions.DELETE_NUMERO_UNICO_DOCUMENTO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'numeroUnicoDocumento',
                        content: 'Apagando a numeroUnicoDocumento id ' + action.payload.numeroUnicoDocumentoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._numeroUnicoDocumentoService.destroy(action.payload.numeroUnicoDocumentoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'numeroUnicoDocumento',
                                content: 'NumeroUnicoDocumento id ' + action.payload.numeroUnicoDocumentoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<NumeroUnicoDocumento>({
                                id: response.id,
                                schema: numeroUnicoDocumentoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new NumeroUnicoDocumentoListActions.DeleteNumeroUnicoDocumentoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.numeroUnicoDocumentoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'numeroUnicoDocumento',
                                content: 'Erro ao apagar a numeroUnicoDocumento id ' + action.payload.numeroUnicoDocumentoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new NumeroUnicoDocumentoListActions.DeleteNumeroUnicoDocumentoFailed(payload));
                        })
                    );
                }, 25)
            );
}

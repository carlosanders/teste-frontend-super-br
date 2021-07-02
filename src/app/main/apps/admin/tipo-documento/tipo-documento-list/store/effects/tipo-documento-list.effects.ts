import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as TipoDocumentoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {TipoDocumento} from '@cdk/models';
import {tipoDocumento as tipoDocumentoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TipoDocumentoListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoDocumentoService: TipoDocumentoService,
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
     * Get TipoDocumento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getTipoDocumento: any =
        this._actions
            .pipe(
                ofType<TipoDocumentoListActions.GetTipoDocumento>(TipoDocumentoListActions.GET_TIPO_DOCUMENTO),
                switchMap(action => this._tipoDocumentoService.query(
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
                            new AddData<TipoDocumento>({data: response['entities'], schema: tipoDocumentoSchema}),
                            new TipoDocumentoListActions.GetTipoDocumentoSuccess({
                                entitiesId: response['entities'].map(tipoDocumento => tipoDocumento.id),
                                loaded: {
                                    id: 'tipoDocumentoHandle',
                                    value: this.routerState.params.tipoDocumentoHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new TipoDocumentoListActions.GetTipoDocumentoFailed(err));
                        })
                    ))
            );

    /**
     * Delete TipoDocumento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteTipoDocumento: Observable<TipoDocumentoListActions.TipoDocumentoListActionsAll> =
        this._actions
            .pipe(
                ofType<TipoDocumentoListActions.DeleteTipoDocumento>(TipoDocumentoListActions.DELETE_TIPO_DOCUMENTO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tipoDocumento',
                        content: 'Apagando a tipoDocumento id ' + action.payload.tipoDocumentoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._tipoDocumentoService.destroy(action.payload.tipoDocumentoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tipoDocumento',
                                content: 'TipoDocumento id ' + action.payload.tipoDocumentoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<TipoDocumento>({
                                id: response.id,
                                schema: tipoDocumentoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new TipoDocumentoListActions.DeleteTipoDocumentoSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.tipoDocumentoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tipoDocumento',
                                content: 'Erro ao apagar a tipoDocumento id ' + action.payload.tipoDocumentoId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new TipoDocumentoListActions.DeleteTipoDocumentoFailed(payload));
                        })
                    );
                }, 25)
            );
}

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store/reducers';
import * as ModalidadeAcaoEtiquetaListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {ModalidadeAcaoEtiqueta} from '@cdk/models';
import {modalidadeAcaoEtiqueta as modalidadeAcaoEtiquetaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class ModalidadeAcaoEtiquetaListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _modalidadeAcaoEtiquetaService: ModalidadeAcaoEtiquetaService,
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
     * Get ModalidadeAcaoEtiqueta with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getModalidadeAcaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaListActions.GetModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaListActions.GET_MODALIDADE_ACAO_ETIQUETA),
                switchMap(action => this._modalidadeAcaoEtiquetaService.query(
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
                            new AddData<ModalidadeAcaoEtiqueta>({data: response['entities'], schema: modalidadeAcaoEtiquetaSchema}),
                            new ModalidadeAcaoEtiquetaListActions.GetModalidadeAcaoEtiquetaSuccess({
                                entitiesId: response['entities'].map(modalidadeAcaoEtiqueta => modalidadeAcaoEtiqueta.id),
                                loaded: {
                                    id: 'modalidadeAcaoEtiquetaHandle',
                                    value: this.routerState.params.modalidadeAcaoEtiquetaHandle
                                },
                                total: response['total']
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ModalidadeAcaoEtiquetaListActions.GetModalidadeAcaoEtiquetaFailed(err));
                        })
                    ))
            );

    /**
     * Delete ModalidadeAcaoEtiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteModalidadeAcaoEtiqueta: Observable<ModalidadeAcaoEtiquetaListActions.ModalidadeAcaoEtiquetaListActionsAll> =
        this._actions
            .pipe(
                ofType<ModalidadeAcaoEtiquetaListActions.DeleteModalidadeAcaoEtiqueta>(ModalidadeAcaoEtiquetaListActions.DELETE_MODALIDADE_ACAO_ETIQUETA),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'modalidadeAcaoEtiqueta',
                        content: 'Apagando a modalidadeAcaoEtiqueta id ' + action.payload.modalidadeAcaoEtiquetaId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._modalidadeAcaoEtiquetaService.destroy(action.payload.modalidadeAcaoEtiquetaId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'modalidadeAcaoEtiqueta',
                                content: 'ModalidadeAcaoEtiqueta id ' + action.payload.modalidadeAcaoEtiquetaId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<ModalidadeAcaoEtiqueta>({
                                id: response.id,
                                schema: modalidadeAcaoEtiquetaSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new ModalidadeAcaoEtiquetaListActions.DeleteModalidadeAcaoEtiquetaSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.modalidadeAcaoEtiquetaId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'modalidadeAcaoEtiqueta',
                                content: 'Erro ao apagar a modalidadeAcaoEtiqueta id ' + action.payload.modalidadeAcaoEtiquetaId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new ModalidadeAcaoEtiquetaListActions.DeleteModalidadeAcaoEtiquetaFailed(payload));
                        })
                    );
                }, 25)
            );
}

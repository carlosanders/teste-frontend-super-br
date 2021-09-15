import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoIdentificadorListActions from '../actions';

import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {DocumentoIdentificador} from '@cdk/models';
import {documentoIdentificador as documentoIdentificadorchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class DocumentoIdentificadorListEffect {
    routerState: any;
    /**
     * Get DocumentoIdentificador with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentoIdentificador: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoIdentificadorListActions.GetDocumentoIdentificador>(DocumentoIdentificadorListActions.GET_DOCUMENTO_IDENTIFICADOR),
        switchMap(action => this._documentoIdentificadorService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<DocumentoIdentificador>({data: response['entities'], schema: documentoIdentificadorchema}),
            new DocumentoIdentificadorListActions.GetDocumentoIdentificadorSuccess({
                entitiesId: response['entities'].map(documentoIdentificador => documentoIdentificador.id),
                loaded: {
                    id: 'pessoaHandle',
                    value: this.routerState.params.pessoaHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentoIdentificadorListActions.GetDocumentoIdentificadorFailed(err));
        })
    ));
    /**
     * Delete DocumentoIdentificador
     *
     * @type {Observable<any>}
     */
    deleteDocumentoIdentificador: Observable<DocumentoIdentificadorListActions.DocumentoIdentificadorListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentoIdentificadorListActions.DeleteDocumentoIdentificador>(DocumentoIdentificadorListActions.DELETE_DOCUMENTO_IDENTIFICADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento identificador',
            content: 'Apagando o documento identificador id ' + action.payload.documentoIdentificadorId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoIdentificadorService.destroy(action.payload.documentoIdentificadorId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento identificador',
                    content: 'Documento identificador id ' + action.payload.documentoIdentificadorId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<DocumentoIdentificador>({
                    id: response.id,
                    schema: documentoIdentificadorchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new DocumentoIdentificadorListActions.DeleteDocumentoIdentificadorSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoIdentificadorId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento identificador',
                    content: 'Erro ao apagar o documento identificador id ' + action.payload.documentoIdentificadorId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentoIdentificadorListActions.DeleteDocumentoIdentificadorFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoIdentificadorService: DocumentoIdentificadorService,
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

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as TarefasActions from '../actions/tarefas.actions';

@Injectable()
export class DocumentosVinculadosEffects {
    payload: any;
    /**
     * Get Documentos Vinculados with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosVinculados: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.GetDocumentosVinculados>(DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS),
        tap(action => this.payload = action.payload),
        switchMap((action) => {
            const params = action.payload.filters;

            return this._documentoService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate));
        }),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema, populate: this.payload.filters.populate}),
            new DocumentosVinculadosActions.GetDocumentosVinculadosSuccess({
                loaded: {
                    id: 'documentoHandle',
                    value: this.payload.documentoId
                },
                entitiesId: response['entities'].map(documento => documento.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosVinculadosActions.GetDocumentosVinculadosFailed(err));
        })
    ));
    /**
     * Delete Documento Vinculado
     *
     * @type {Observable<any>}
     */
    deleteDocumentoVinculado: Observable<DocumentosVinculadosActions.DocumentosVinculadosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.DeleteDocumentoVinculado>(DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Apagando o documento anexo id ' + action.payload.documentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoService.destroy(action.payload.documentoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Documento anexo id ' + action.payload.documentoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Documento>({
                    id: response.id,
                    schema: documentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                this._store.dispatch(new TarefasActions.AtualizaEtiquetaMinuta(action.payload.documentoPrincipalId));
                return new DocumentosVinculadosActions.DeleteDocumentoVinculadoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Erro ao apagar o documento anexo de id ' + action.payload.documentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentosVinculadosActions.DeleteDocumentoVinculadoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Update Documento Vinculado
     *
     * @type {Observable<any>}
     */
    updateDocumentoVinculado: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.UpdateDocumentoVinculado>(DocumentosVinculadosActions.UPDATE_DOCUMENTO_VINCULADO),
        mergeMap((action) => {
            const populate = JSON.stringify([
                'tipoDocumento',
                'atualizadoPor'
            ]);
            return this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}, populate).pipe(
                mergeMap((response: Documento) => [
                    new DocumentosVinculadosActions.UpdateDocumentoVinculadoSuccess(response.id),
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {atualizadoEm: response.atualizadoEm, atualizadoPor: response.atualizadoPor, tipoDocumento: response.tipoDocumento}
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosVinculadosActions.UpdateDocumentoVinculadoFailed(err));
                })
            );
        }, 25)
    ));
    /**
     * Action disparada quando os uploads de anexos de um Documento Vinculado são concluídos dentro do dialog
     *
     * @type {Observable<any>}
     */
    completeDocumentoVinculado: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.CompleteDocumentoVinculado>(DocumentosVinculadosActions.COMPLETE_DOCUMENTO_VINCULADO),
        tap((action) => {
            this._store.dispatch(new AddData<ComponenteDigital>({
                data: [action.payload.componenteDigital],
                schema: componenteDigitalSchema,
                populate: [
                    'documento',
                    'documento.tipoDocumento'
                ]
            }));
            this._store.dispatch(new TarefasActions.AtualizaEtiquetaMinuta(action.payload.documentoPrincipalId));
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute,
    ) {
    }
}

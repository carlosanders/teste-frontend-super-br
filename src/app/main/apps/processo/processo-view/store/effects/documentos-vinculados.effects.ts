import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {Assinatura, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {assinatura as assinaturaSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class DocumentosVinculadosEffects {
    documento: Documento;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
    }

    /**
     * Get Documentos Vinculados with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentosVinculados: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.GetDocumentosVinculados>(DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS),
                switchMap((action) => {

                    this.documento = action.payload;
                    let documentoId = `eq:${action.payload.id}`;

                    const params = {
                        filter: {
                            'vinculacaoDocumentoPrincipal.documento.id': documentoId,
                            'juntadaAtual': 'isNull'
                        },
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'tipoDocumento',
                            'vinculacaoDocumentoPrincipal',
                            'vinculacaoDocumentoPrincipal.documento',
                            'vinculacaoDocumentoPrincipal.documento.componentesDigitais',
                            'componentesDigitais',
                            'processoOrigem',
                            'setorOrigem',
                            'tarefaOrigem',
                            'tarefaOrigem.usuarioResponsavel',
                            'tarefaOrigem.vinculacoesEtiquetas',
                            'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
                        ]
                    };

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
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentosVinculadosActions.GetDocumentosVinculadosSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: this.documento.id
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentosVinculadosActions.GetDocumentosVinculadosFailed(err));
                    return caught;
                })
            );

    /**
     * Delete Documento Vinculado
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumentoVinculado: Observable<DocumentosVinculadosActions.DocumentosVinculadosActionsAll> =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.DeleteDocumentoVinculado>(DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Apagando o documento anexo id ' + action.payload.documentoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._documentoService.destroy(action.payload.documentoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento',
                                content: 'Documento anexo id ' + action.payload.documentoId + ' deletado com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Documento>({
                                id: response.id,
                                schema: documentoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
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
                    );
                }, 25)
            );

    /**
     * Assina Documento Vinculado
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoVinculado: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.AssinaDocumentoVinculado>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO),
                mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                    .pipe(
                        map(response => new DocumentosVinculadosActions.PreparaAssinaturaVinculadoSuccess(response)),
                        catchError((err, caught) => {
                            const payload = {
                                id: action.payload,
                                error: err
                            };
                            console.log(err);
                            return of(new DocumentosVinculadosActions.PreparaAssinaturaVinculadoFailed(payload));
                        })
                    ), 25
                ));

    /**
     * Prepara Assinatura Success
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    preparaAssinaturaSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.PreparaAssinaturaVinculadoSuccess>(DocumentosVinculadosActions.PREPARA_ASSINATURA_VINCULADO_SUCCESS),
                tap((action) => {
                    if (action.payload.secret) {
                        const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                        const ifrm = document.createElement('iframe');
                        ifrm.setAttribute('src', url);
                        ifrm.style.width = '0';
                        ifrm.style.height = '0';
                        ifrm.style.border = '0';
                        document.body.appendChild(ifrm);
                        setTimeout(() => document.body.removeChild(ifrm), 20000);
                    }
                }));

    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamente>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE),
                mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
                    mergeMap((response: Assinatura) => [
                        new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteSuccess(action.payload.documento.id),
                        new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                        new UpdateData<Documento>({
                            id: action.payload.documento.id,
                            schema: documentoSchema,
                            changes: {assinado: true}
                        }),
                        new OperacoesActions.Resultado({
                            type: 'assinatura',
                            content: `Assinatura id ${response.id} criada com sucesso!`,
                            dateTime: response.criadoEm
                        })
                    ]),
                    catchError((err) => {
                        const payload = {
                            documentoId: action.payload.documento.id,
                            error: err
                        };
                        console.log(err);
                        return of(new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteFailed(payload));
                    })
                ))
            );

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.RemoveAssinaturaDocumentoVinculado>(DocumentosVinculadosActions.REMOVE_ASSINATURA_DOCUMENTO_VINCULADO),
                mergeMap(action => this._documentoService.removeAssinatura(action.payload)
                    .pipe(
                        mergeMap(response => [
                            new DocumentosVinculadosActions.RemoveAssinaturaDocumentoVinculadoSuccess(action.payload),
                            new UpdateData<Documento>({
                                id: action.payload,
                                schema: documentoSchema,
                                changes: {assinado: false}
                            })
                        ]),
                        catchError((err, caught) => {
                            console.log(err);
                            return of(new DocumentosVinculadosActions.RemoveAssinaturaDocumentoVinculadoFailed(action.payload));
                        })
                    ), 25
                ));

    /**
     * Update Documento Vinculado
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateDocumentoVinculado: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.UpdateDocumentoVinculado>(DocumentosVinculadosActions.UPDATE_DOCUMENTO_VINCULADO),
                mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
                    mergeMap((response: Documento) => [
                        new DocumentosVinculadosActions.UpdateDocumentoVinculadoSuccess(response.id),
                        new AddData<Documento>({data: [response], schema: documentoSchema}),
                        new DocumentosVinculadosActions.GetDocumentosVinculados(this.documento)
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new DocumentosVinculadosActions.UpdateDocumentoVinculadoFailed(err));
                    })
                ), 25)
            );

    /**
     * Download Documento Vinculado P7S
     *
     * @type {Observable<any>}
     *
     * */
    @Effect()
    downloadVinculadoP7S: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.DownloadVinculadoP7S>(DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_VINCULADO_P7S),
                mergeMap(action => this._componenteDigitalService.downloadP7S(action.payload.id)
                    .pipe(
                        map((response) => {
                            if (response) {
                                const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                                const byteNumbers = new Array(byteCharacters.length);
                                for (let i = 0; i < byteCharacters.length; i++) {
                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                }
                                const byteArray = new Uint8Array(byteNumbers);
                                const blob = new Blob([byteArray], {type: response.mimetype});
                                const URL = window.URL;
                                const data = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = data;
                                link.download = response.fileName;
                                link.dispatchEvent(new MouseEvent('click', {
                                    bubbles: true,
                                    cancelable: true,
                                    view: window
                                }));
                                setTimeout(() => {
                                    window.URL.revokeObjectURL(data);
                                    link.remove();
                                }, 100);
                            }
                            return new DocumentosVinculadosActions.DownloadVinculadoP7SSuccess(action.payload);
                        }),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentosVinculadosActions.DownloadVinculadoP7SFailed(action.payload));
                        })
                    ), 25
                )
            );
}

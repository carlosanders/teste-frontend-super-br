import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as DocumentosActions from '../actions';

import { AddData } from '@cdk/ngrx-normalizr';
import { select, Store } from '@ngrx/store';
import { getRouterState, State } from 'app/store/reducers';
import {Assinatura, ComponenteDigital, Documento, DocumentoAvulso} from '@cdk/models';
import { DocumentoService } from '@cdk/services/documento.service';
import {assinatura as assinaturaSchema, documento as documentoSchema, componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ComponenteDigitalService} from "@cdk/services/componente-digital.service";

@Injectable()
export class DocumentosEffects {
    routerState: any;
    documentoAvulso: DocumentoAvulso;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _assinaturaService: AssinaturaService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Documentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.GetDocumentos>(DocumentosActions.GET_DOCUMENTOS),
                switchMap((action) => {
                    return this._documentoService.query(
                        JSON.stringify(action.payload),
                        10,
                        0,
                        JSON.stringify({criadoEm: 'DESC'}),
                        JSON.stringify([
                            'tipoDocumento',
                            'documentoAvulsoRemessa',
                            'documentoAvulsoRemessa.documentoResposta',
                            'componentesDigitais',
                            'juntadaAtual'
                        ]));
                }),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentosActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentosActions.GetDocumentosFailed(err));
                    return caught;
                })
            );


    /**
     * Get Documentos Complementares with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentosComplementares: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.GetDocumentosComplementares>(DocumentosActions.GET_DOCUMENTOS_COMPLEMENTARES),
                switchMap((action) => {
                    return this._documentoService.query(
                        JSON.stringify(action.payload),
                        10,
                        0,
                        JSON.stringify({criadoEm: 'DESC'}),
                        JSON.stringify([
                            'tipoDocumento',
                            'documentoAvulsoRemessa',
                            'documentoAvulsoRemessa.documentoResposta',
                            'componentesDigitais',
                            'juntadaAtual'
                        ]));
                }),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentosActions.GetDocumentosCompelemtaresSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentosActions.GetDocumentosComplementaresFailed(err));
                    return caught;
                })
            );

    /**
     * Clicked Documento
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.ClickedDocumento>(DocumentosActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace(`detalhe/${this.routerState.params.processoHandle}/complementar/${this.routerState.params.processoHandle}`, 'documento/')
                    + action.payload.componentesDigitais[0].id + '/visualizar']);
                })
            );

    /**
     * Converte Documento
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.ConverteToPdf>(DocumentosActions.CONVERTE_DOCUMENTO),
                mergeMap((action) => {
                        return this._componenteDigitalService.preparaConverter(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap((response) => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new DocumentosActions.ConverteToPdfSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new DocumentosActions.ConverteToPdfFailed(action.payload));
                                })
                            );
                    }
                )
            );

    /**
     * Converte Documento HTML
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumentoHtml: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.ConverteToPdf>(DocumentosActions.CONVERTE_DOCUMENTO_HTML),
                mergeMap((action) => {
                        return this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap((response) => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new DocumentosActions.ConverteToHtmlSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new DocumentosActions.ConverteToHtmlFailed(action.payload));
                                })
                            );
                    }
                )
            );

    /**
     * Delete Documento
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<DocumentosActions.DocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<DocumentosActions.DeleteDocumento>(DocumentosActions.DELETE_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.destroy(action.payload).pipe(
                            map((response) => new DocumentosActions.DeleteDocumentoSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new DocumentosActions.DeleteDocumentoFailed(action.payload));
                            })
                        );
                    }
                ));

    /**
     * Assina Documento
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.AssinaDocumento>(DocumentosActions.ASSINA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new DocumentosActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new DocumentosActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Assina Documento Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.AssinaDocumentoSuccess>(DocumentosActions.ASSINA_DOCUMENTO_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                }));

    /**
     * Save Documento Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.AssinaDocumentoEletronicamente>(DocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura).pipe(
                        mergeMap((response: Assinatura) => [
                            new DocumentosActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documentoId),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new DocumentosActions.GetDocumentos({'processoOrigem.id': `eq:${action.payload.processoId}`}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentosActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    );
                })
            );

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.RemoveAssinaturaDocumento>(DocumentosActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new DocumentosActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                    new DocumentosActions.GetDocumentos({'processoOrigem.id': `eq:${action.payload.processoId}`}),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new DocumentosActions.RemoveAssinaturaDocumentoFailed(action.payload));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Download P7S
     * @type {Observable<any>}
     *
     * */
    @Effect()
    downloadP7S: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.DownloadToP7S>(DocumentosActions.DOWNLOAD_DOCUMENTO_P7S),
                mergeMap((action) => {
                        return this._componenteDigitalService.downloadP7S(action.payload, {hash: action.payload.hash})
                            .pipe(
                                map((response) => {
                                    if (response && response.conteudo) {
                                        const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                                        const byteNumbers = new Array(byteCharacters.length);
                                        for (let i = 0; i < byteCharacters.length; i++) {
                                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                                        }
                                        const byteArray = new Uint8Array(byteNumbers);
                                        const blob = new Blob([byteArray], {type: response.mimetype}),
                                            URL = window.URL;
                                        const data = URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = data;
                                        link.download = response.fileName;
                                        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                                        setTimeout( () => {
                                            window.URL.revokeObjectURL(data);
                                            link.remove();
                                        }, 100);
                                    }
                                    return new DocumentosActions.DownloadToP7SSuccess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new DocumentosActions.DownloadToP7SFailed(action.payload));
                                })
                            );
                    }
                )
            );

}

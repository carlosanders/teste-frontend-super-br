import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as DocumentosActions from '../actions';
import * as DocumentosComplementaresActions from '../../../complementar/store/actions';

import {AddData} from '@cdk/ngrx-normalizr';
import { select, Store } from '@ngrx/store';
import { getRouterState, State } from 'app/store/reducers';
import { DocumentoAvulso, Documento } from '@cdk/models';
import { DocumentoService } from '@cdk/services/documento.service';
import { DocumentoAvulsoService } from '@cdk/services/documento-avulso.service';
import { documento as documentoSchema } from '@cdk/normalizr/documento.schema';
import { Router } from '@angular/router';
import { getDocumentoAvulso } from '../../../store/selectors';
import { environment } from 'environments/environment';
import * as DocumentoAvulsoDetailActions from '../../../store/actions';
import { documentoAvulso as documentoAvulsoSchema } from '@cdk/normalizr/documento-avulso.schema';

@Injectable()
export class DocumentosEffects {
    routerState: any;
    documentoAvulso: DocumentoAvulso;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _documentoAvulsoService: DocumentoAvulsoService,
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

        this._store
            .pipe(select(getDocumentoAvulso))
            .subscribe(documentoAvulso => {
                this.documentoAvulso = documentoAvulso;
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
                        1,
                        0,
                        JSON.stringify({}),
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
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    }),
                    new DocumentosComplementaresActions.GetDocumentosComplementares({
                        'documentoAvulsoComplementacaoResposta.id': `eq:${this.documentoAvulso.id}`
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentosActions.GetDocumentosFailed(err));
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
                    console.log('apps/documento/componente-digital/' + action.payload.componentesDigitais[0].id
                        + '/visualizar/' + this.routerState.params.chaveAcessoHandle);
                    this._router.navigate(['apps/documento/componente-digital/' + action.payload.componentesDigitais[0].id
                    + '/visualizar/' + this.routerState.params.chaveAcessoHandle]);
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
                        return this._documentoService.preparaConverter(action.payload, {hash: action.payload.hash})
                            .pipe(
                                map((response) => {
                                    return new DocumentosActions.ConverteToPdfSucess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new DocumentosActions.ConverteToPdfFailed(action.payload));
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

                    const url = environment.jnlp + 'v1/assinatura/' + action.payload.jwt + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                }));

    /**
     * Get Documento Resposta with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentoResposta: any =
        this._actions
            .pipe(
                ofType<DocumentosActions.GetDocumentoResposta>(DocumentosActions.GET_DOCUMENTO_RESPOSTA),
                switchMap((action) => {
                    return this._documentoAvulsoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'processo',
                            'processo.especieProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta',
                            'documentoResposta'
                        ]),
                        JSON.stringify({chaveAcesso: `${this.routerState.params['chaveAcessoHandle']}`})
                    );
                }),
                mergeMap(response => [
                    new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
                    new DocumentoAvulsoDetailActions.GetDocumentoAvulsoSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        documentoAvulso: response['entities'][0]
                    }),
                    new DocumentosActions.GetDocumentos({id: `eq:${response['entities'][0].documentoResposta.id}`})
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoDetailActions.GetDocumentoAvulsoFailed(err));
                    return caught;
                })
            );
}

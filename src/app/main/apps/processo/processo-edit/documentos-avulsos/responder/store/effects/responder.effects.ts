import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap, map} from 'rxjs/operators';

import * as DocumentoAvulsoReponderActions from '../actions/responder.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {
    assinatura as assinaturaSchema,
    documento as documentoSchema,
    documentoAvulso as documentoAvulsoSchema
} from '@cdk/normalizr';
import {Assinatura, Documento, DocumentoAvulso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {DocumentoService} from '@cdk/services/documento.service';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import { getDocumentoAvulso } from '../selectors';
import {environment} from 'environments/environment';

@Injectable()
export class DocumentoAvulsoResponderEffect {
    routerState: any;
    documentoAvulso: DocumentoAvulso;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _documentoAvulsoService: DocumentoAvulsoService,
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

        this._store
            .pipe(select(getDocumentoAvulso))
            .subscribe(documentoAvulso => {
                this.documentoAvulso = documentoAvulso;
            });
    }

    /**
     * Get DocumentoAvulso with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentoAvulso: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoReponderActions.GetDocumentoAvulso>(DocumentoAvulsoReponderActions.GET_DOCUMENTO_AVULSO),
                switchMap((action) => {
                    return this._documentoAvulsoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'documentoResposta.componentesDigitais',
                        ]));
                }),
                switchMap(response => [
                    new AddData<DocumentoAvulso>({data: response['entities'], schema: documentoAvulsoSchema}),
                    new DocumentoAvulsoReponderActions.GetDocumentoAvulsoSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        documentoAvulsoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoReponderActions.GetDocumentoAvulsoFailed(err));
                    return caught;
                })
            );


    /**
     * Get Documentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoReponderActions.GetDocumentos>(DocumentoAvulsoReponderActions.GET_DOCUMENTOS),
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
                    new DocumentoAvulsoReponderActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoReponderActions.GetDocumentosFailed(err));
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
                ofType<DocumentoAvulsoReponderActions.ClickedDocumento>(DocumentoAvulsoReponderActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace(`responder/${this.routerState.params.documentoAvulsoHandle}`, 'documento/')
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
                ofType<DocumentoAvulsoReponderActions.ConverteToPdf>(DocumentoAvulsoReponderActions.CONVERTE_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaConverter(action.payload, {hash: action.payload.hash})
                            .pipe(
                                map((response) => {
                                    return new DocumentoAvulsoReponderActions.ConverteToPdfSucess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new DocumentoAvulsoReponderActions.ConverteToPdfFailed(err));
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
    deleteDocumento: Observable<DocumentoAvulsoReponderActions.ResponderActionsAll> =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoReponderActions.DeleteDocumento>(DocumentoAvulsoReponderActions.DELETE_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.destroy(action.payload).pipe(
                            map((response) => new DocumentoAvulsoReponderActions.DeleteDocumentoSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new DocumentoAvulsoReponderActions.DeleteDocumentoFailed(err));
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
                ofType<DocumentoAvulsoReponderActions.AssinaDocumento>(DocumentoAvulsoReponderActions.ASSINA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new DocumentoAvulsoReponderActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new DocumentoAvulsoReponderActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Save Documento Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoReponderActions.AssinaDocumentoEletronicamente>(DocumentoAvulsoReponderActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({password: action.payload.password})).pipe(
                        mergeMap((response: Assinatura) => [
                            new DocumentoAvulsoReponderActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoAvulsoReponderActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    );
                })
            );

    /**
     * Assina Documento Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoAvulsoReponderActions.AssinaDocumentoSuccess>(DocumentoAvulsoReponderActions.ASSINA_DOCUMENTO_SUCCESS),
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
                ofType<DocumentoAvulsoReponderActions.GetDocumentoResposta>(DocumentoAvulsoReponderActions.GET_DOCUMENTO_RESPOSTA),
                switchMap((action) => {
                    return this._documentoAvulsoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'processo',
                            'processo.especieProcesso',
                            'processo.especieProcesso.generoProcesso',
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
                    new DocumentoAvulsoReponderActions.GetDocumentoAvulsoSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        documentoAvulso: response['entities'][0]
                    }),
                    new DocumentoAvulsoReponderActions.GetDocumentos({id: `eq:${response['entities'][0].documentoResposta.id}`})
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoReponderActions.GetDocumentoAvulsoFailed(err));
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
                ofType<DocumentoAvulsoReponderActions.GetDocumentosComplementares>(DocumentoAvulsoReponderActions.GET_DOCUMENTOS_COMPLEMENTARES),
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
                    new DocumentoAvulsoReponderActions.GetDocumentosCompelemtaresSuccess({
                        loaded: {
                            id: 'documentoAvulsoHandle',
                            value: this.routerState.params.documentoAvulsoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoAvulsoReponderActions.GetDocumentosCompelemtaresFailed(err));
                    return caught;
                })
            );
}

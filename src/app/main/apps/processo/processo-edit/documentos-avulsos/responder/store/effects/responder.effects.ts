import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentoAvulsoReponderActions from '../actions/responder.actions';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    assinatura as assinaturaSchema,
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema,
    documentoAvulso as documentoAvulsoSchema
} from '@cdk/normalizr';
import {Assinatura, ComponenteDigital, Documento, DocumentoAvulso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {getDocumentoAvulso} from '../selectors';
import {environment} from 'environments/environment';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class DocumentoAvulsoResponderEffect {
    routerState: any;
    documentoAvulso: DocumentoAvulso;
    /**
     * Get DocumentoAvulso with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentoAvulso: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.GetDocumentoAvulso>(DocumentoAvulsoReponderActions.GET_DOCUMENTO_AVULSO),
        switchMap(action => this._documentoAvulsoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'documentoResposta.componentesDigitais',
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoReponderActions.GetDocumentoAvulsoFailed(err));
        })
    ));
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.GetDocumentos>(DocumentoAvulsoReponderActions.GET_DOCUMENTOS),
        switchMap(action => this._documentoService.query(
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
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoReponderActions.GetDocumentosFailed(err));
        })
    ));
    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    clickedDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.ClickedDocumento>(DocumentoAvulsoReponderActions.CLICKED_DOCUMENTO),
        tap((action) => {
            this._router.navigate([this.routerState.url.replace(`responder/${this.routerState.params.documentoAvulsoHandle}`, 'documento/')
            + action.payload.componentesDigitais[0].id + '/visualizar']).then();
        })
    ), {dispatch: false});
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.ConverteToPdf>(DocumentoAvulsoReponderActions.CONVERTE_DOCUMENTO),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new DocumentoAvulsoReponderActions.ConverteToPdfSucess(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentoAvulsoReponderActions.ConverteToPdfFailed(err));
                })
            )
        )
    ));
    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtml: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.ConverteToHtml>(DocumentoAvulsoReponderActions.CONVERTE_DOCUMENTO_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({
                        data: response['entities'],
                        schema: componenteDigitalSchema
                    }),
                    new DocumentoAvulsoReponderActions.ConverteToHtmlSucess(action.payload)
                ]),
                catchError(err => of(new DocumentoAvulsoReponderActions.ConverteToHtmlFailed(err)))
            )
        )
    ));
    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<DocumentoAvulsoReponderActions.ResponderActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.DeleteDocumento>(DocumentoAvulsoReponderActions.DELETE_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento avulso',
            content: 'Apagando o documento avulso id ' + action.payload.documentoAvulsoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoAvulsoService.destroy(action.payload.documentoAvulsoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Documento avulso id ' + action.payload.documentoAvulsoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<DocumentoAvulso>({
                    id: response.id,
                    schema: documentoAvulsoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new DocumentoAvulsoReponderActions.DeleteDocumentoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoAvulsoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Erro ao apagar o documento avulso id ' + action.payload.documentoAvulsoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentoAvulsoReponderActions.DeleteDocumentoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.AssinaDocumento>(DocumentoAvulsoReponderActions.ASSINA_DOCUMENTO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
            .pipe(
                map(response => new DocumentoAvulsoReponderActions.AssinaDocumentoSuccess(response)),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentoAvulsoReponderActions.AssinaDocumentoFailed(err));
                })
            )
        ))
    );
    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamente: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.AssinaDocumentoEletronicamente>(DocumentoAvulsoReponderActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap((action) => {
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Criando assinatura...',
                status: 0, // carregando
                lote: action.payload.loteId
            }));
        }),
        switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            mergeMap((response: Assinatura) => [
                new DocumentoAvulsoReponderActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documento.id),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new UpdateData<Documento>({
                    id: action.payload.documento.id,
                    schema: documentoSchema,
                    changes: {assinado: true}
                }),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: `Assinatura id ${response.id} criada com sucesso!`,
                    status: 1, // sucesso
                    lote: action.payload.loteId
                })
            ]),
            catchError((err) => {
                const payload = {
                    documentoId: action.payload.documento.id,
                    error: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Erro ao salvar a assinatura!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new DocumentoAvulsoReponderActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));
    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.AssinaDocumentoSuccess>(DocumentoAvulsoReponderActions.ASSINA_DOCUMENTO_SUCCESS),
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
        }))
    );
    /**
     * Get Documento Resposta with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentoResposta: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.GetDocumentoResposta>(DocumentoAvulsoReponderActions.GET_DOCUMENTO_RESPOSTA),
        switchMap(action => this._documentoAvulsoService.query(
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
        )),
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoReponderActions.GetDocumentoAvulsoFailed(err));
        })
    ));
    /**
     * Get Documentos Complementares with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosComplementares: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.GetDocumentosComplementares>(DocumentoAvulsoReponderActions.GET_DOCUMENTOS_COMPLEMENTARES),
        switchMap(action => this._documentoService.query(
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
            ]))),
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoReponderActions.GetDocumentosCompelemtaresFailed(err));
        })
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _assinaturaService: AssinaturaService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store
            .pipe(select(getDocumentoAvulso))
            .subscribe((documentoAvulso) => {
                this.documentoAvulso = documentoAvulso;
            });
    }
}

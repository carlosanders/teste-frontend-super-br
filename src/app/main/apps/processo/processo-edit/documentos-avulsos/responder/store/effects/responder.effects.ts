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
                'processo',
                'especieDocumentoAvulso',
                'modelo',
                'setorDestino',
                'pessoaDestino',
                'documentoRemessa',
                'documentoResposta',
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
            ]),
            JSON.stringify({'incluiVinculacaoDocumentoPrincipal': true}))),
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
                documentoAvulsoId: response['entities'][0]
            }),
            new DocumentoAvulsoReponderActions.ReloadDocumentosComplementares()
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
            JSON.stringify({
                ...action.payload.filter
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
            new DocumentoAvulsoReponderActions.GetDocumentosComplementaresSuccess({
                loaded: {
                    id: 'documentoAvulsoHandle',
                    value: this.routerState.params.documentoAvulsoHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoReponderActions.GetDocumentosComplementaresFailed(err));
        })
    ));
    /**
     * Reload Documentos
     */
    reloadDocumentosComplementares: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoReponderActions.ReloadDocumentosComplementares>(DocumentoAvulsoReponderActions.RELOAD_DOCUMENTOS_COMPLEMENTARES),
        map(() => {
            this._store.dispatch(new DocumentoAvulsoReponderActions.UnloadDocumentosComplementares({reset: false}));
            let documentoId = null;

            const routeParams = of('documentoAvulsoHandle');
            routeParams.subscribe((param) => {
                documentoId = `eq:${this.routerState.params[param]}`;
            });

            const params = {
                filter: {
                    'documentoAvulsoComplementacaoResposta.id': documentoId
                },
                limit: 10,
                offset: 0,
                sort: {criadoEm: 'ASC'},
                populate: [
                    'tipoDocumento',
                    'documentoAvulsoRemessa',
                    'documentoAvulsoRemessa.documentoResposta',
                    'componentesDigitais',
                    'juntadaAtual'
                ],
                context: {'incluiVinculacaoDocumentoPrincipal': true}
            };
            this._store.dispatch(new DocumentoAvulsoReponderActions.GetDocumentosComplementares(params));
        })
    ), {dispatch: false});

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

import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentosActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, ComponenteDigital, Documento, DocumentoAvulso} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    assinatura as assinaturaSchema,
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema
} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {LoginService} from '../../../../../../auth/login/login.service';

@Injectable()
export class DocumentosEffects {
    routerState: any;
    documentoAvulso: DocumentoAvulso;
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.GetDocumentos>(DocumentosActions.GET_DOCUMENTOS),
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
            new DocumentosActions.GetDocumentosSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosActions.GetDocumentosFailed(err));
        })
    ));
    /**
     * Get Documentos Complementares with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosComplementares: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.GetDocumentosComplementares>(DocumentosActions.GET_DOCUMENTOS_COMPLEMENTARES),
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
            new DocumentosActions.GetDocumentosCompelemtaresSuccess({
                loaded: {
                    id: 'documentoAvulsoHandle',
                    value: this.routerState.params.documentoAvulsoHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosActions.GetDocumentosComplementaresFailed(err));
        })
    ));
    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    clickedDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.ClickedDocumento>(DocumentosActions.CLICKED_DOCUMENTO),
        tap((action) => {
            this._router.navigate([
                this.routerState.url.replace(`detalhe/${this.routerState.params.processoHandle}/complementar/${this.routerState.params.processoHandle}`, 'documento/')
                + action.payload.componentesDigitais[0].id + '/visualizar'
            ]).then();
        })
    ), {dispatch: false});
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.ConverteToPdf>(DocumentosActions.CONVERTE_DOCUMENTO),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new DocumentosActions.ConverteToPdfSucess(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActions.ConverteToPdfFailed(action.payload));
                })
            ), 25
        )
    ));
    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtml: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.ConverteToPdf>(DocumentosActions.CONVERTE_DOCUMENTO_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({
                        data: response['entities'],
                        schema: componenteDigitalSchema
                    }),
                    new DocumentosActions.ConverteToHtmlSucess(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActions.ConverteToHtmlFailed(action.payload));
                })
            ), 25
        )
    ));
    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<DocumentosActions.DocumentosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.DeleteDocumento>(DocumentosActions.DELETE_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Apagando o documento id ' + action.payload.documentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoService.destroy(action.payload.documentoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Documento id ' + action.payload.documentoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Documento>({
                    id: response.id,
                    schema: documentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new DocumentosActions.DeleteDocumentoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Erro ao apagar a documento id ' + action.payload.documentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentosActions.DeleteDocumentoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.AssinaDocumento>(DocumentosActions.ASSINA_DOCUMENTO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
            .pipe(
                map(response => new DocumentosActions.AssinaDocumentoSuccess(response)),
                catchError((err, caught) => {
                    console.log(err);
                    return of(new DocumentosActions.AssinaDocumentoFailed(err));
                })
            ), 25)
    ));
    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.AssinaDocumentoSuccess>(DocumentosActions.ASSINA_DOCUMENTO_SUCCESS),
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
        })
    ), {dispatch: false});
    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamente: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.AssinaDocumentoEletronicamente>(DocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Salvando a assinatura ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Assinatura) => [
                new DocumentosActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documentoId),
                new DocumentosActions.GetDocumentos({
                    'processoOrigem.id': `eq:${action.payload.processoId}`,
                    'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
                }),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema})
            ]),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoId,
                    err: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Erro ao salvar a assinatura!',
                    status: 2, // erro
                }));
                return of(new DocumentosActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));

    removeAssinaturaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.RemoveAssinaturaDocumento>(DocumentosActions.REMOVE_ASSINATURA_DOCUMENTO),
        mergeMap(action => this._documentoService.removeAssinatura(action.payload)
            .pipe(
                mergeMap(response => [
                    new DocumentosActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                    new DocumentosActions.GetDocumentos({
                        'processoOrigem.id': `eq:${action.payload.processoId}`,
                        'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
                    }),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActions.RemoveAssinaturaDocumentoFailed(action.payload));
                })
            ), 25)
    ));
    /**
     * Download P7S
     *
     * @type {Observable<any>}
     *
     * */
    downloadP7S: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosActions.DownloadToP7S>(DocumentosActions.DOWNLOAD_DOCUMENTO_P7S),
        mergeMap(action => this._componenteDigitalService.downloadP7S(action.payload, {hash: action.payload.hash})
            .pipe(
                map((response) => {
                    if (response && response.conteudo) {
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
                    return new DocumentosActions.DownloadToP7SSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosActions.DownloadToP7SFailed(action.payload));
                })
            ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _assinaturaService: AssinaturaService,
        private _loginService: LoginService,
        private _router: Router,
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

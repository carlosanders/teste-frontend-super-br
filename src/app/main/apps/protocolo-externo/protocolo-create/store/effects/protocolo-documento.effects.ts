import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';


import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {
    assinatura as assinaturaSchema,
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema
} from '@cdk/normalizr';
import * as ProtocoloDocumentoActions from '../actions';
import {Router} from '@angular/router';
import {getDocumentos} from '../selectors';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {environment} from '../../../../../../../environments/environment';
import * as OperacoesActions from '../../../../../../store/actions/operacoes.actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {LoginService} from "../../../../../auth/login/login.service";

@Injectable()
export class ProtocoloDocumentoEffects {
    routerState: any;
    documentos: Documento[];

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _loginService: LoginService,
        private _assinaturaService: AssinaturaService,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _router: Router,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store
            .pipe(select(getDocumentos))
            .subscribe((documentos) => {
                this.documentos = documentos;
            });
    }

    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.GetDocumentos>(ProtocoloDocumentoActions.GET_DOCUMENTOS),
                switchMap(action => this._documentoService.query(
                        JSON.stringify(action.payload),
                        100,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new ProtocoloDocumentoActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    }),
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProtocoloDocumentoActions.GetDocumentosFailed(err));
                    return caught;
                })
            );

    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.ClickedDocumento>(ProtocoloDocumentoActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace(`detalhe/${this.routerState.params.documentoAvulsoHandle}/reponder/${this.routerState.params.chaveAcessoHandle}`, 'documento/')
                    + action.payload.componentesDigitais[0].id + '/visualizar/' + this.routerState.params.chaveAcessoHandle]);
                })
            );

    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.AssinaDocumento>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO),
                mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map(response => new ProtocoloDocumentoActions.AssinaDocumentoSuccess(response)),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new ProtocoloDocumentoActions.AssinaDocumentoFailed(err));
                                })
                            )
                ));

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.RemoveAssinaturaDocumento>(ProtocoloDocumentoActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap(action => this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap(response => [
                                    new ProtocoloDocumentoActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                    new ProtocoloDocumentoActions.GetDocumentos({
                                        'processoOrigem.id': `eq:${action.payload.processoId}`,
                                        'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
                                    }),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProtocoloDocumentoActions.RemoveAssinaturaDocumentoFailed(action.payload));
                                    return caught;
                                })
                            )
                ));

    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.AssinaDocumentoSuccess>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO_SUCCESS),
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
                ofType<ProtocoloDocumentoActions.AssinaDocumentoEletronicamente>(ProtocoloDocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Salvando a assinatura ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._assinaturaService.save(action.payload.assinatura).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'assinatura',
                                content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Assinatura) => [
                            new ProtocoloDocumentoActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new ProtocoloDocumentoActions.GetDocumentos({
                                'processoOrigem.id': `eq:${action.payload.processoId}`,
                                'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
                            }),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'assinatura',
                                content: 'Erro ao salvar a assinatura!',
                                status: 2, // erro
                            }));
                            return of(new ProtocoloDocumentoActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    )
                })
            );

    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumento: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.ConverteToPdf>(ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE),
                mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
                            .pipe(
                                mergeMap(response => [
                                    new UpdateData<Documento>({
                                        id: response.id,
                                        schema: documentoSchema,
                                        changes: {componentesDigitais: response.componentesDigitais}
                                    }),
                                    new ProtocoloDocumentoActions.ConverteToPdfSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new ProtocoloDocumentoActions.ConverteToPdfFailed(action.payload));
                                })
                            )
                )
            );

    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumentoHtml: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.ConverteToHtml>(ProtocoloDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
                mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap(response => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new ProtocoloDocumentoActions.ConverteToHtmlSucess(action.payload)
                                ]),
                                catchError(err => of(new ProtocoloDocumentoActions.ConverteToHtmlFailed(action.payload)))
                            )
                )
            );

    /**
     * Download P7S
     *
     * @type {Observable<any>}
     *
     * */
    @Effect()
    downloadP7S: any =
        this._actions
            .pipe(
                ofType<ProtocoloDocumentoActions.DownloadToP7S>(ProtocoloDocumentoActions.DOWNLOAD_DOCUMENTO_P7S),
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
                                        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                                        setTimeout( () => {
                                            window.URL.revokeObjectURL(data);
                                            link.remove();
                                        }, 100);
                                    }
                                    return new ProtocoloDocumentoActions.DownloadToP7SSuccess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new ProtocoloDocumentoActions.DownloadToP7SFailed(action.payload));
                                })
                            )
                )
            );

}

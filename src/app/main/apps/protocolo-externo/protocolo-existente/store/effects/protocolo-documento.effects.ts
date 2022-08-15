import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema
} from '@cdk/normalizr';
import * as ProtocoloExistenteDocumentoActions from '../actions';
import {Router} from '@angular/router';
import {getDocumentos} from '../selectors';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {LoginService} from '../../../../../auth/login/login.service';

@Injectable()
export class ProtocoloDocumentoEffects {
    routerState: any;
    documentos: Documento[];
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteDocumentoActions.GetDocumentos>(ProtocoloExistenteDocumentoActions.GET_DOCUMENTOS),
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
            new ProtocoloExistenteDocumentoActions.GetDocumentosSuccess({
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
                total: response['total']
            }),
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProtocoloExistenteDocumentoActions.GetDocumentosFailed(err));
        })
    ));
    /**
     * Reload Documentos
     */
    reloadDocumentosComplementares: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteDocumentoActions.ReloadDocumentos>(ProtocoloExistenteDocumentoActions.RELOAD_DOCUMENTOS),
        map(() => {
            this._store.dispatch(new ProtocoloExistenteDocumentoActions.UnloadDocumentos());
            const params = {
                filter: {
                    'processoOrigem.id': `eq:${this.routerState.params['processoHandle']}`,
                    'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
                },
                limit: 10,
                offset: 0,
                sort: {criadoEm: 'ASC'},
                populate: [
                    'populateAll',
                    'tipoDocumento',
                    'documentoAvulsoRemessa',
                    'documentoAvulsoRemessa.documentoResposta',
                    'componentesDigitais',
                    'juntadaAtual'
                ],
                context: {'incluiVinculacaoDocumentoPrincipal': true}
            };
            this._store.dispatch(new ProtocoloExistenteDocumentoActions.GetDocumentos(params));
        })
    ), {dispatch: false});
    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    clickedDocumento: any = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteDocumentoActions.ClickedDocumento>(ProtocoloExistenteDocumentoActions.CLICKED_DOCUMENTO),
        tap((action) => {
            this._router.navigate([
                this.routerState.url.replace(`detalhe/${this.routerState.params.documentoAvulsoHandle}/reponder/${this.routerState.params.chaveAcessoHandle}`, 'documento/')
                + action.payload.componentesDigitais[0].id + '/visualizar/' + this.routerState.params.chaveAcessoHandle
            ]).then();
        })
    ), {dispatch: false});
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteDocumentoActions.ConverteToPdf>(ProtocoloExistenteDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new ProtocoloExistenteDocumentoActions.ConverteToPdfSucess(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProtocoloExistenteDocumentoActions.ConverteToPdfFailed(action.payload));
                })
            )
        )
    ));
    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtml: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteDocumentoActions.ConverteToHtml>(ProtocoloExistenteDocumentoActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({
                        data: response['entities'],
                        schema: componenteDigitalSchema
                    }),
                    new ProtocoloExistenteDocumentoActions.ConverteToHtmlSucess(action.payload)
                ]),
                catchError(() => of(new ProtocoloExistenteDocumentoActions.ConverteToHtmlFailed(action.payload)))
            )
        )
    ));
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProtocoloExistenteDocumentoActions.UpdateDocumento>(ProtocoloExistenteDocumentoActions.UPDATE_DOCUMENTO),
        mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
            mergeMap((response: Documento) => [
                new ProtocoloExistenteDocumentoActions.UpdateDocumentoSuccess(response.id),
                new AddData<Documento>({data: [response], schema: documentoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ProtocoloExistenteDocumentoActions.UpdateDocumentoFailed(err));
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
        ofType<ProtocoloExistenteDocumentoActions.DownloadToP7S>(ProtocoloExistenteDocumentoActions.DOWNLOAD_DOCUMENTO_P7S),
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
                    return new ProtocoloExistenteDocumentoActions.DownloadToP7SSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new ProtocoloExistenteDocumentoActions.DownloadToP7SFailed(action.payload));
                })
            )
        )
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store.pipe(
            select(getDocumentos)
        ).subscribe((documentos) => {
            this.documentos = documentos;
        });
    }
}

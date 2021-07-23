import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {assinatura as assinaturaSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {ComponenteDigitalService} from "../../../../../../../../@cdk/services/componente-digital.service";
import {DocumentosVinculadosActionsAll} from '../actions/documentos-vinculados.actions';

@Injectable()
export class DocumentosVinculadosEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
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
                switchMap(() => {

                    let documentoId = null;

                    const routeParams = of('documentoHandle');
                    routeParams.subscribe((param) => {
                        documentoId = `eq:${this.routerState.params[param]}`;
                    });

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
                            'componentesDigitais'
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
                            value: this.routerState.params.documentoHandle
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
                        type: 'documentoVinculado',
                        content: 'Apagando a documentoVinculado id ' + action.payload.documentoVinculadoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._documentoService.destroy(action.payload.documentoVinculadoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documentoVinculado',
                                content: 'DocumentoVinculado id ' + action.payload.documentoVinculadoId + ' deletada com sucesso.',
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
                                id: action.payload.documentoVinculadoId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documentoVinculado',
                                content: 'Erro ao apagar a documentoVinculado id ' + action.payload.documentoVinculadoId + '!',
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
     * Delete Documento Vinculado
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
                                map(response => new DocumentosVinculadosActions.AssinaDocumentoVinculadoSuccess(response)),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new DocumentosVinculadosActions.AssinaDocumentoVinculadoFailed(err));
                                })
                            ), 25
                ));

    /**
     * Assina Documento Vinculado
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoVinculadoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.AssinaDocumentoVinculadoSuccess>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_SUCCESS),
                tap((action) => {
                    if (action.payload.secret) {
                        const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                        const ifrm = document.createElement('iframe');
                        ifrm.setAttribute('src', url);
                        ifrm.style.width = '0';
                        ifrm.style.height = '0';
                        ifrm.style.border = '0';
                        document.body.appendChild(ifrm);
                        setTimeout(() => document.body.removeChild(ifrm), 2000);
                    }
                }));

    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoVinculadoEletronicamente: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamente>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE),
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
                            new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
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
                            return of(new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteFailed(err));
                        })
                    )
                })
            );

    /**
     * Clicked Documento Vinculado
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumentoVinculado: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.ClickedDocumentoVinculado>(DocumentosVinculadosActions.CLICKED_DOCUMENTO_VINCULADO),
                tap((action) => {
                    let sidebar = 'editar/atividade';
                    let primary: string;
                    primary = 'componente-digital/';
                    if (action.payload.componentesDigitais[0]) {
                        primary += action.payload.componentesDigitais[0].id + '/editor/ckeditor';
                    } else {
                        primary += '0';
                    }
                    if (action.payload.vinculacaoDocumentoPrincipal) {
                        sidebar = 'editar/dados-basicos';
                    }
                    this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/' + action.payload.id, {outlets: {primary: primary, sidebar: sidebar}}],
                        {
                            relativeTo: this._activatedRoute.parent // <--- PARENT activated route.
                        }).then();
                })
            );

    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentosVinculadosActions.UpdateDocumento>(DocumentosVinculadosActions.UPDATE_DOCUMENTO),
                mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
                    mergeMap((response: Documento) => [
                        new DocumentosVinculadosActions.UpdateDocumentoSuccess(response.id),
                        new AddData<Documento>({data: [response], schema: documentoSchema}),
                        new DocumentosVinculadosActions.GetDocumentosVinculados()
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new DocumentosVinculadosActions.UpdateDocumentoFailed(err));
                    })
                ), 25)
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
                ofType<DocumentosVinculadosActions.DownloadP7S>(DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_P7S),
                mergeMap(action => this._componenteDigitalService.downloadP7S(action.payload.id, JSON.stringify({hash: action.payload.hash}))
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
                            return new DocumentosVinculadosActions.DownloadP7SSuccess(action.payload);
                        }),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentosVinculadosActions.DownloadP7SFailed(action.payload));
                        })
                    ), 25

                )
            );
}

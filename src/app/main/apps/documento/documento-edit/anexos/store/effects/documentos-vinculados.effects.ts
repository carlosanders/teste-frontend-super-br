import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

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
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class DocumentosVinculadosEffects {
    routerState: any;
    /**
     * Get Documentos Vinculados with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosVinculados: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.GetDocumentosVinculados>(DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS),
        switchMap(action => this._documentoService.query(
            JSON.stringify({
                ...action.payload.filter
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
            new DocumentosVinculadosActions.GetDocumentosVinculadosSuccess({
                loaded: {
                    id: 'documentoHandle',
                    value: this.routerState.params.documentoHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new DocumentosVinculadosActions.GetDocumentosVinculadosFailed(err));
        })
    ));
    /**
     * Reload Documentos Vinculados
     */
    reloadDocumentosVinculados: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.ReloadDocumentosVinculados>(DocumentosVinculadosActions.RELOAD_DOCUMENTOS_VINCULADOS),
        map(() => {
            this._store.dispatch(new DocumentosVinculadosActions.UnloadDocumentosVinculados({reset: false}));
            let documentoId = null;

            const routeParams = of('documentoHandle');
            routeParams.subscribe((param) => {
                documentoId = `eq:${this.routerState.params[param]}`;
            });

            const params = {
                filter: {
                    'vinculacaoDocumentoPrincipal.documento.id': documentoId
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
            this._store.dispatch(new DocumentosVinculadosActions.GetDocumentosVinculados(params));
        })
    ), {dispatch: false});
    /**
     * Delete Documento Vinculado
     *
     * @type {Observable<any>}
     */
    deleteDocumentoVinculado: Observable<DocumentosVinculadosActions.DocumentosVinculadosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.DeleteDocumentoVinculado>(DocumentosVinculadosActions.DELETE_DOCUMENTO_VINCULADO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento vinculado',
            content: 'Apagando o documento vinculado id ' + action.payload.documentoVinculadoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoService.destroy(action.payload.documentoVinculadoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento vinculado',
                    content: 'Documento vinculado id ' + action.payload.documentoVinculadoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Documento>({
                    id: response.id,
                    schema: documentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new DocumentosVinculadosActions.DeleteDocumentoVinculadoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documentoVinculadoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento vinculado',
                    content: 'Erro ao apagar o documento vinculado id ' + action.payload.documentoVinculadoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentosVinculadosActions.DeleteDocumentoVinculadoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Assina Documento Vinculado
     *
     * @type {Observable<any>}
     */
    assinaDocumentoVinculado: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.AssinaDocumentoVinculado>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify(action.payload))
            .pipe(
                map(response => new DocumentosVinculadosActions.PreparaAssinaturaVinculadoSuccess(response)),
                catchError((err) => {
                    const payload = {
                        id: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new DocumentosVinculadosActions.PreparaAssinaturaVinculadoFailed(payload));
                })
            ), 25)
    ));
    /**
     * Prepara Assinatura Success
     *
     * @type {Observable<any>}
     */
    preparaAssinaturaSuccess: any = createEffect(() => this._actions.pipe(
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
        })
    ), {dispatch: false});
    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaDocumentoVinculadoEletronicamente: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamente>(DocumentosVinculadosActions.ASSINA_DOCUMENTO_VINCULADO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Salvando a assinatura ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Assinatura) => [
                new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteSuccess(action.payload.documento.id),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new UpdateData<Documento>({
                    id: action.payload.documento.id,
                    schema: documentoSchema,
                    changes: {assinado: true}
                }),
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
                }));
                return of(new DocumentosVinculadosActions.AssinaDocumentoVinculadoEletronicamenteFailed(payload));
            })
        ))
    ));
    /**
     * Remove Assinatura de Documento
     */
    removeAssinaturaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
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
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosVinculadosActions.RemoveAssinaturaDocumentoVinculadoFailed(action.payload));
                })
            ), 25)
    ));
    /**
     * Clicked Documento Vinculado
     *
     * @type {Observable<any>}
     */
    clickedDocumentoVinculado: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.ClickedDocumentoVinculado>(DocumentosVinculadosActions.CLICKED_DOCUMENTO_VINCULADO),
        tap((action) => {
            let sidebar = 'editar/anexos';
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
            this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/' + action.payload.id, {
                    outlets: {
                        primary: primary,
                        sidebar: sidebar
                    }
                }],
                {
                    relativeTo: this._activatedRoute.parent // <--- PARENT activated route.
                }).then();
        })
    ), {dispatch: false});
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.UpdateDocumento>(DocumentosVinculadosActions.UPDATE_DOCUMENTO),
        mergeMap((action) => {
            const populate = JSON.stringify([
                'tipoDocumento',
                'atualizadoPor'
            ]);
            return this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}, populate).pipe(
                mergeMap((response: Documento) => [
                    new DocumentosVinculadosActions.UpdateDocumentoSuccess(response.id),
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {atualizadoEm: response.atualizadoEm, atualizadoPor: response.atualizadoPor, tipoDocumento: response.tipoDocumento}
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosVinculadosActions.UpdateDocumentoFailed(err));
                })
            );
        }, 25)
    ));
    /**
     * Download P7S
     *
     * @type {Observable<any>}
     *
     * */
    downloadP7S: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.DownloadP7S>(DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_P7S),
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
                    return new DocumentosVinculadosActions.DownloadP7SSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosVinculadosActions.DownloadP7SFailed(action.payload));
                })
            ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute,
        private _componenteDigitalService: ComponenteDigitalService,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

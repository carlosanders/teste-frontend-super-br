import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, filter, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as ProcessoViewDocumentosActions from '../actions/documentos.actions';
import {AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    assinatura as assinaturaSchema,
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema,
    vinculacaoDocumento as vinculacaoDocumentoSchema
} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ReloadJuntadas} from '../actions';
import {getBufferingDelete, getDeletingDocumentosId} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {GetTarefa} from '../../../../tarefas/tarefa-detail/store';

@Injectable()
export class ProcessoViewDocumentosEffects {
    routerState: any;
    routeAtividadeDocumento: string;
    routeOficio: string;
    /**
     * Reload Documento
     *
     * @type {Observable<any>}
     */
    reloadDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.ReloadDocumento>(ProcessoViewDocumentosActions.RELOAD_DOCUMENTO),
        switchMap((action) => {
            const populate = [
                'tipoDocumento',
                'documentoAvulsoRemessa',
                'documentoAvulsoRemessa.documentoResposta',
                'componentesDigitais',
            ];

            return this._documentoService.get(action.payload, JSON.stringify(populate)).pipe(
                mergeMap(response => [
                    new AddData<Documento>({data: [response], schema: documentoSchema}),
                    new ProcessoViewDocumentosActions.ReloadDocumentoSuccess(response.id)
                ]),
                catchError((err) => {
                    const payload = {
                        id: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.ReloadDocumentoFailed(payload));
                })
            );
        }),
    ));
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.GetDocumentos>(ProcessoViewDocumentosActions.GET_DOCUMENTOS),
        switchMap(() => {

            let tarefaId = null;

            const routeParams = of('tarefaHandle');
            routeParams.subscribe((param) => {
                tarefaId = `eq:${this.routerState.params[param]}`;
            });

            const params = {
                filter: {
                    'tarefaOrigem.id': tarefaId,
                    'juntadaAtual': 'isNull'
                },
                limit: 25,
                offset: 0,
                sort: {
                    criadoEm: 'DESC'
                },
                populate: [
                    'tipoDocumento',
                    'documentoAvulsoRemessa',
                    'documentoAvulsoRemessa.documentoResposta',
                    'componentesDigitais',
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
            new ProcessoViewDocumentosActions.GetDocumentosSuccess({
                loaded: {
                    id: 'tarefaHandle',
                    value: this.routerState.params.tarefaHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoViewDocumentosActions.GetDocumentosFailed(err));
        })
    ));
    /**
     * Get Documentos Excluídos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentosExcluidos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.GetDocumentosExcluidos>(ProcessoViewDocumentosActions.GET_DOCUMENTOS_EXCLUIDOS),
        switchMap(() => {

            let tarefaId = null;

            const routeParams = of('tarefaHandle');
            routeParams.subscribe((param) => {
                tarefaId = `eq:${this.routerState.params[param]}`;
            });

            const params = {
                filter: {
                    'tarefaOrigem.id': tarefaId,
                    'juntadaAtual': 'isNull'
                },
                limit: 10,
                offset: 0,
                sort: {
                    criadoEm: 'DESC'
                },
                populate: [
                    'tipoDocumento',
                    'documentoAvulsoRemessa',
                    'documentoAvulsoRemessa.documentoResposta',
                    'componentesDigitais'
                ],
                context: {
                    'mostrarApagadas': true
                }
            };

            return this._documentoService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate),
                JSON.stringify(params.context));
        }),
        mergeMap(response => [
            new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
            new ProcessoViewDocumentosActions.GetDocumentosExcluidosSuccess({
                loaded: {
                    id: 'tarefaHandle',
                    value: this.routerState.params.tarefaHandle
                },
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoViewDocumentosActions.GetDocumentosExcluidosFailed(err));
        })
    ));
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.UpdateDocumento>(ProcessoViewDocumentosActions.UPDATE_DOCUMENTO),
        mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
            mergeMap((response: Documento) => [
                new ProcessoViewDocumentosActions.UpdateDocumentoSuccess(response.id),
                new AddData<Documento>({data: [response], schema: documentoSchema}),
                new ProcessoViewDocumentosActions.GetDocumentos()
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ProcessoViewDocumentosActions.UpdateDocumentoFailed(err));
            })
        ), 25)
    ));
    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<ProcessoViewDocumentosActions.ProcessoViewDocumentosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.DeleteDocumento>(ProcessoViewDocumentosActions.DELETE_DOCUMENTO),
        tap((action) => {
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento',
                content: 'Apagando o documento id ' + action.payload.documentoId + '...',
                status: 0, // carregando
                lote: action.payload.loteId,
                redo: action.payload.redo,
                undo: action.payload.undo
            }));
        }),
        buffer(this._store.pipe(select(getBufferingDelete))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(getDeletingDocumentosId))),
        mergeMap(([action, deletingDocumentosIds]) => {
            if (deletingDocumentosIds.indexOf(action.payload.documentoId) === -1) {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Operação de apagar o documento id ' + action.payload.documentoId + ' foi cancelada!',
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                }));
                return of(new ProcessoViewDocumentosActions.DeleteDocumentoCancelSuccess(action.payload.documentoId));
            }
            return this._documentoService.destroy(action.payload.documentoId).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Documento id ' + action.payload.documentoId + ' deletado com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId,
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    this._store.dispatch(new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {apagadoEm: response.apagadoEm}
                    }));
                    if (this.routerState.params['tarefaHandle']) {
                        this._store.dispatch(new GetTarefa({id: this.routerState.params['tarefaHandle']}));
                    }
                    return new ProcessoViewDocumentosActions.DeleteDocumentoSuccess(response.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.documentoId,
                        error: err
                    };
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Erro ao apagar o documento id ' + action.payload.documentoId + '!',
                        status: 2, // erro
                        lote: action.payload.loteId,
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.DeleteDocumentoFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.AssinaDocumento>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify(action.payload))
            .pipe(
                map(response => new ProcessoViewDocumentosActions.PreparaAssinaturaSuccess(response)),
                catchError((err) => {
                    const payload = {
                        id: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.PreparaAssinaturaFailed(payload));
                })
            ), 25)
    ));
    /**
     * Assina Juntada
     *
     * @type {Observable<any>}
     */
    assinaJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.AssinaJuntada>(ProcessoViewDocumentosActions.ASSINA_JUNTADA),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
            .pipe(
                mergeMap(response => [
                    new ProcessoViewDocumentosActions.PreparaAssinaturaSuccess(response),
                ]),
                catchError((err) => {
                    const payload = {
                        id: action.payload,
                        error: err
                    };
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.PreparaAssinaturaFailed(payload));
                })
            )
        )
    ));
    removeAssinaturaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.RemoveAssinaturaDocumento>(ProcessoViewDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO),
        mergeMap(action => this._documentoService.removeAssinatura(action.payload)
            .pipe(
                mergeMap(() => [
                    new ProcessoViewDocumentosActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                    new UpdateData<Documento>({
                        id: action.payload,
                        schema: documentoSchema,
                        changes: {assinado: false}
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.RemoveAssinaturaDocumentoFailed(action.payload));
                })
            ), 25)
    ));
    /**
     * Prepara Assinatura Success
     *
     * @type {Observable<any>}
     */
    preparaAssinaturaSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.PreparaAssinaturaSuccess>(ProcessoViewDocumentosActions.PREPARA_ASSINATURA_SUCCESS),
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
     * Assina Juntada Success
     *
     * @type {Observable<any>}
     */
    assinaJuntadaSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.AssinaJuntadaSuccess>(ProcessoViewDocumentosActions.ASSINA_JUNTADA_SUCCESS),
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
        ofType<ProcessoViewDocumentosActions.AssinaDocumentoEletronicamente>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Assinando documento id ' + action.payload.documento.id + ' ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            mergeMap((response: Assinatura) => [
                new ProcessoViewDocumentosActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documento.id),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new UpdateData<Documento>({
                    id: action.payload.documento.id,
                    schema: documentoSchema,
                    changes: {assinado: true}
                }),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
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
                    content: 'Erro ao assinar documento id ' + action.payload.documento.id + '!',
                    status: 2, // erro
                }));
                return of(new ProcessoViewDocumentosActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));
    /**
     * Save Juntada Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaJuntadaEletronicamente: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.AssinaJuntadaEletronicamente>(ProcessoViewDocumentosActions.ASSINA_JUNTADA_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Salvando a assinatura de juntada...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            mergeMap((response: Assinatura) => [
                new ProcessoViewDocumentosActions.AssinaJuntadaEletronicamenteSuccess(action.payload.documento.id),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new UpdateData<Documento>({
                    id: action.payload.documento.id,
                    schema: documentoSchema,
                    changes: {assinado: true}
                }),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
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
                    content: 'Erro ao salvar a assinatura em juntada!',
                    status: 2, // erro
                }));
                return of(new ProcessoViewDocumentosActions.AssinaJuntadaEletronicamenteFailed(payload));
            })
        ))
    ));
    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    clickedDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.ClickedDocumento>(ProcessoViewDocumentosActions.CLICKED_DOCUMENTO),
        tap((action) => {
            let primary: string;
            primary = 'componente-digital/';
            let componenteDigital = null;

            if (action.payload.documento.componentesDigitais[0]) {
                componenteDigital = action.payload.documento.componentesDigitais[0];
                primary += componenteDigital.id;
            } else {
                primary += '0';
            }

            if (componenteDigital && componenteDigital.editavel && !componenteDigital.assinado && !componenteDigital.apagadoEm) {
                primary += '/editor/ckeditor';
            } else {
                primary += '/visualizar';
            }

            let sidebar = action.payload.routeOficio + '/dados-basicos';

            if (!action.payload.documento?.documentoAvulsoRemessa && !action.payload.documento?.juntadaAtual && !action.payload.documento?.vinculacaoDocumentoPrincipal) {
                sidebar = 'editar/' + action.payload.routeAtividade;
            } else if (action.payload.documento?.juntadaAtual || action.payload.documento?.vinculacaoDocumentoPrincipal) {
                sidebar = 'editar/dados-basicos';
            }

            this._router.navigate([
                    this.routerState.url.split('/visualizar/' + this.routerState.params.stepHandle)[0] +
                    '/visualizar/' + this.routerState.params.stepHandle +
                    '/documento/' + action.payload.documento.id,
                    {
                        outlets: {
                            primary: primary,
                            sidebar: sidebar
                        }
                    }],
                {
                    relativeTo: this.activatedRoute.parent,
                    queryParams: {lixeira: action.payload.documento.apagadoEm ? true : null}
                }).then();

        })
    ), {dispatch: false});
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.ConverteToPdf>(ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new ProcessoViewDocumentosActions.ConverteToPdfSucess(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.ConverteToPdfFailed(action.payload));
                })
            ), 25)
    ));
    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtml: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.ConverteToHtml>(ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({
                        data: response['entities'],
                        schema: componenteDigitalSchema
                    }),
                    new ProcessoViewDocumentosActions.ConverteToHtmlSucess(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.ConverteToHtmlFailed(action.payload));
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
        ofType<ProcessoViewDocumentosActions.DownloadToP7S>(ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_P7S),
        mergeMap(action => this._componenteDigitalService.downloadP7S(action.payload)
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
                    return new ProcessoViewDocumentosActions.DownloadToP7SSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.DownloadToP7SFailed(action.payload));
                })
            ), 25)
    ));
    removeVinculacaoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.RemoveVinculacaoDocumento>(ProcessoViewDocumentosActions.REMOVE_VINCULACAO_DOCUMENTO),
        switchMap(action => this._vinculacaoDocumentoService.destroy(action.payload.id)
            .pipe(
                mergeMap(() => [
                    new RemoveChildData({
                        id: action.payload.id,
                        childSchema: vinculacaoDocumentoSchema,
                        parentSchema: documentoSchema,
                        parentId: action.payload.documento.id
                    }),
                    new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoSuccess(action.payload.id),
                    new ReloadJuntadas(),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoFailed(action.payload.id));
                })
            )
        )
    ));
    /**
     * Undelete Documento
     *
     * @type {Observable<any>}
     */
    undeleteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.UndeleteDocumento>(ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO),
        tap((action) => {
            this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento',
                content: 'Restaurando o documento id ' + action.payload.documento.id + '...',
                status: 0, // carregando
                lote: action.payload.loteId
            }));
        }),
        mergeMap(action => this._documentoService.undelete(action.payload.documento).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Documento id ' + action.payload.documento.id + ' restaurado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                return new ProcessoViewDocumentosActions.UndeleteDocumentoSuccess({
                    documento: response,
                    loaded: action.payload.loaded
                });
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.documento.id,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Erro ao restaurar o documento id ' + action.payload.documento.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ProcessoViewDocumentosActions.UndeleteDocumentoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _assinaturaService: AssinaturaService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
        private _router: Router,
        private _store: Store<State>,
        public activatedRoute: ActivatedRoute
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

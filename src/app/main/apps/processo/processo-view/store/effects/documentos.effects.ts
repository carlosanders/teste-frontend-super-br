import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as ProcessoViewDocumentosActions from '../actions/documentos.actions';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, Documento, Tarefa} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {assinatura as assinaturaSchema, documento as documentoSchema, tarefa as tarefaSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {GetJuntadas} from '../actions';
import {getBufferingDelete, getDeletingDocumentosId, getPagination} from '../selectors';

@Injectable()
export class ProcessoViewDocumentosEffects {
    routerState: any;
    routeAtividadeDocumento: string;
    routeOficio: string;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
        private _router: Router,
        private _store: Store<State>,
        public activatedRoute: ActivatedRoute
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
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
                ofType<ProcessoViewDocumentosActions.GetDocumentos>(ProcessoViewDocumentosActions.GET_DOCUMENTOS),
                switchMap(() => {

                    let tarefaId = null;

                    const routeParams = of('tarefaHandle');
                    routeParams.subscribe(param => {
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoViewDocumentosActions.GetDocumentosFailed(err));
                    return caught;
                })
            );


    /**
     * Get Documentos Excluídos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentosExcluidos: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.GetDocumentosExcluidos>(ProcessoViewDocumentosActions.GET_DOCUMENTOS_EXCLUIDOS),
                switchMap(() => {

                    let tarefaId = null;

                    const routeParams = of('tarefaHandle');
                    routeParams.subscribe(param => {
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoViewDocumentosActions.GetDocumentosExcluidosFailed(err));
                    return caught;
                })
            );

    /**
     * Update Documento
     * @type {Observable<any>}
     */
    @Effect()
    updateDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.UpdateDocumento>(ProcessoViewDocumentosActions.UPDATE_DOCUMENTO),
                mergeMap((action) => {
                    return this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
                        mergeMap((response: Documento) => [
                            new ProcessoViewDocumentosActions.UpdateDocumentoSuccess(response.id),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new ProcessoViewDocumentosActions.GetDocumentos()
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewDocumentosActions.UpdateDocumentoFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Documento
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<ProcessoViewDocumentosActions.ProcessoViewDocumentosActionsAll> =
        this._actions
            .pipe(
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
                                content: 'Documento id ' + action.payload.documentoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId,
                                redo: 'inherent',
                                undo: 'inherent'
                            }));
                            new UpdateData<Documento>({id: response.id, schema: documentoSchema, changes: {apagadoEm: response.apagadoEm}});
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
            );

    /**
     * Assina Documento
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaDocumento>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new ProcessoViewDocumentosActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProcessoViewDocumentosActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Assina Juntada
     * @type {Observable<any>}
     */
    @Effect()
    assinaJuntada: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaJuntada>(ProcessoViewDocumentosActions.ASSINA_JUNTADA),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new ProcessoViewDocumentosActions.AssinaJuntadaSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProcessoViewDocumentosActions.AssinaJuntadaFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.RemoveAssinaturaDocumento>(ProcessoViewDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new ProcessoViewDocumentosActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                    new ProcessoViewDocumentosActions.GetDocumentos(),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProcessoViewDocumentosActions.RemoveAssinaturaDocumentoFailed(action.payload));
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
                ofType<ProcessoViewDocumentosActions.AssinaDocumentoSuccess>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                }));

    /**
     * Assina Juntada Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaJuntadaSuccess: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaJuntadaSuccess>(ProcessoViewDocumentosActions.ASSINA_JUNTADA_SUCCESS),
                tap((action) => {

                    const url = environment.jnlp + 'v1/administrativo/assinatura/' + action.payload.secret + '/get_jnlp';

                    const ifrm = document.createElement('iframe');
                    ifrm.setAttribute('src', url);
                    ifrm.style.width = '0';
                    ifrm.style.height = '0';
                    ifrm.style.border = '0';
                    document.body.appendChild(ifrm);
                    setTimeout(() => document.body.removeChild(ifrm), 20000);
                }));

    /**
     * Save Documento Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaDocumentoEletronicamente>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({plainPassword: action.payload.plainPassword})).pipe(
                        mergeMap((response: Assinatura) => [
                            new ProcessoViewDocumentosActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new ProcessoViewDocumentosActions.GetDocumentos(),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewDocumentosActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Juntada Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaJuntadaEletronicamente: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaJuntadaEletronicamente>(ProcessoViewDocumentosActions.ASSINA_JUNTADA_ELETRONICAMENTE),
                withLatestFrom(this._store.pipe(select(getPagination))),
                switchMap(([action, pagination]) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({plainPassword: action.payload.plainPassword})).pipe(
                        mergeMap((response: Assinatura) => [
                            new ProcessoViewDocumentosActions.AssinaJuntadaEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new GetJuntadas(pagination),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewDocumentosActions.AssinaJuntadaEletronicamenteFailed(err));
                        })
                    );
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
                ofType<ProcessoViewDocumentosActions.ClickedDocumento>(ProcessoViewDocumentosActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    let primary: string;
                    primary = 'componente-digital/';
                    if (action.payload.documento.componentesDigitais[0]) {
                        primary += action.payload.documento.componentesDigitais[0].id;
                    } else {
                        primary += '0';
                    }
                    if (action.payload.documento.apagadoEm) {
                        primary += '/visualizar';
                    }
                    let sidebar = action.payload.routeOficio + '/dados-basicos';
                    if (!action.payload.documento.documentoAvulsoRemessa && !action.payload.documento.juntadaAtual) {
                        sidebar = 'editar/' + action.payload.routeAtividade;
                    } else if (action.payload.documento.juntadaAtual) {
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
            );

    /**
     * Converte Documento
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.ConverteToPdf>(ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaConverter(action.payload, {hash: action.payload.hash})
                            .pipe(
                                map((response) => {
                                    return new ProcessoViewDocumentosActions.ConverteToPdfSucess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new ProcessoViewDocumentosActions.ConverteToPdfFailed(action.payload));
                                })
                            )
                            ;
                    }
                )
            );

    /**
     * Download P7S
     * @type {Observable<any>}
     *
     * */
    @Effect()
    downloadP7S: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.DownloadToP7S>(ProcessoViewDocumentosActions.DOWNLOAD_DOCUMENTO_P7S),
                mergeMap((action) => {
                        return this._documentoService.downloadP7S(action.payload, {hash: action.payload.hash})
                            .pipe(
                                map((response) => {
                                    if (response && response.conteudo) {
                                        const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                                        const byteNumbers = new Array(byteCharacters.length);
                                        for (let i = 0; i < byteCharacters.length; i++) {
                                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                                        }
                                        const byteArray = new Uint8Array(byteNumbers);
                                        const blob = new Blob([byteArray], {type: response.mimetype}),
                                            URL = window.URL;
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
                                    return new ProcessoViewDocumentosActions.DownloadToP7SSuccess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new ProcessoViewDocumentosActions.DownloadToP7SFailed(action.payload));
                                })
                            )
                            ;
                    }
                )
            );

    @Effect()
    removeVinculacaoDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.RemoveVinculacaoDocumento>(ProcessoViewDocumentosActions.REMOVE_VINCULACAO_DOCUMENTO),
                withLatestFrom(this._store.pipe(select(getPagination))),
                switchMap(([action, pagination]) => {
                        return this._vinculacaoDocumentoService.destroy(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new GetJuntadas(pagination),
                                    new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoSuccess(action.payload),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoFailed(action.payload));
                                })
                            );
                    }
                ));


    /**
     * Undelete Documento
     * @type {Observable<any>}
     */
    @Effect()
    undeleteDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.UndeleteDocumento>(ProcessoViewDocumentosActions.UNDELETE_DOCUMENTO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Restaurando a documento id ' + action.payload.documento.id + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._documentoService.undelete(action.payload.documento).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento',
                                content: 'Documento id ' + action.payload.documento.id + ' restaurada com sucesso.',
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
                                content: 'Erro ao restaurar a documento id ' + action.payload.documento.id + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new ProcessoViewDocumentosActions.UndeleteDocumentoFailed(payload));
                        })
                    );
                }, 25)
            );
}

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as AtividadeCreateDocumentosActions
    from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    assinatura as assinaturaSchema,
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema
} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {getBufferingDelete, getDeletingDocumentosId} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {GetTarefa} from '../../../../store';

@Injectable()
export class AtividadeCreateDocumentosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _assinaturaService: AssinaturaService,
        private _router: Router,
        private _store: Store<State>,
        public activatedRoute: ActivatedRoute
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
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.GetDocumentos>(AtividadeCreateDocumentosActions.GET_DOCUMENTOS),
                switchMap((action) => {

                    let tarefaId = null;

                    const routeParams = of('tarefaHandle');
                    routeParams.subscribe((param) => {
                        tarefaId = `eq:${this.routerState.params[param]}`;
                    });

                    let params = {};
                    if (!action.payload['filter']) {
                        params = {
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
                                'componentesDigitais',
                                'juntadaAtual'
                            ]
                        };
                    } else {
                        params = {
                            filter: action.payload['filter'],
                            limit: action.payload['limit'],
                            offset: action.payload['offset'],
                            sort: action.payload['sort'],
                            populate: action.payload['populate'],
                            context: action.payload['context']
                        };
                    }

                    return this._documentoService.query(
                        JSON.stringify({
                            ...params['filter']
                        }),
                        params['limit'],
                        params['offset'],
                        JSON.stringify(params['sort']),
                        JSON.stringify(params['populate']),
                        JSON.stringify(params['context']));
                }),
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new AtividadeCreateDocumentosActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AtividadeCreateDocumentosActions.GetDocumentosFailed(err));
                    return caught;
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
                ofType<AtividadeCreateDocumentosActions.UpdateDocumento>(AtividadeCreateDocumentosActions.UPDATE_DOCUMENTO),
                mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
                        mergeMap((response: Documento) => [
                            new AtividadeCreateDocumentosActions.UpdateDocumentoSuccess(response.id),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new AtividadeCreateDocumentosActions.GetDocumentos()
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AtividadeCreateDocumentosActions.UpdateDocumentoFailed(err));
                        })
                    ))
            );

    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<AtividadeCreateDocumentosActions.AtividadeCreateDocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.DeleteDocumento>(AtividadeCreateDocumentosActions.DELETE_DOCUMENTO),
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
                        return of(new AtividadeCreateDocumentosActions.DeleteDocumentoCancelSuccess(action.payload.documentoId));
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
                            this._store.dispatch(new GetTarefa({id: this.routerState.params['tarefaHandle']}));
                            return new AtividadeCreateDocumentosActions.DeleteDocumentoSuccess(response.id);
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
                            return of(new AtividadeCreateDocumentosActions.DeleteDocumentoFailed(payload));
                        })
                    );
                }, 25)
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
                ofType<AtividadeCreateDocumentosActions.AssinaDocumento>(AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO),
                mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map(response => new AtividadeCreateDocumentosActions.AssinaDocumentoSuccess(response)),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new AtividadeCreateDocumentosActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            )
                ));

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.RemoveAssinaturaDocumento>(AtividadeCreateDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap(action => this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap(response => [
                                    new AtividadeCreateDocumentosActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                    new AtividadeCreateDocumentosActions.GetDocumentos(),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new AtividadeCreateDocumentosActions.RemoveAssinaturaDocumentoFailed(action.payload));
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
                ofType<AtividadeCreateDocumentosActions.AssinaDocumentoSuccess>(AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO_SUCCESS),
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
     *
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.AssinaDocumentoEletronicamente>(AtividadeCreateDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
                        mergeMap((response: Assinatura) => [
                            new AtividadeCreateDocumentosActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new AtividadeCreateDocumentosActions.GetDocumentos(),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AtividadeCreateDocumentosActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    ))
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
                ofType<AtividadeCreateDocumentosActions.ClickedDocumento>(AtividadeCreateDocumentosActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    let primary: string;
                    primary = 'componente-digital/';
                    if (action.payload.componentesDigitais[0]) {
                        primary += action.payload.componentesDigitais[0].id;
                    } else {
                        primary += '0';
                    }
                    if (action.payload.apagadoEm) {
                        primary += '/visualizar';
                    }
                    let sidebar = 'oficio/dados-basicos';
                    if (!action.payload.documentoAvulsoRemessa) {
                        sidebar = 'editar/atividade';
                    }
                    this._router.navigate([this.routerState.url + '/documento/' + action.payload.id, {
                            outlets: {
                                primary: primary,
                                sidebar: sidebar
                            }
                        }],
                        {
                            relativeTo: this.activatedRoute.parent,
                            queryParams: {lixeira: action.payload.apagadoEm ? true : null}
                        }).then();

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
                ofType<AtividadeCreateDocumentosActions.ConverteToPdf>(AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE),
                mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
                            .pipe(
                                mergeMap(response => [
                                    new UpdateData<Documento>({
                                        id: response.id,
                                        schema: documentoSchema,
                                        changes: {componentesDigitais: response.componentesDigitais}
                                    }),
                                    new AtividadeCreateDocumentosActions.ConverteToPdfSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new AtividadeCreateDocumentosActions.ConverteToPdfFailed(action.payload));
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
                ofType<AtividadeCreateDocumentosActions.ConverteToHtml>(AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
                mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap(response => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new AtividadeCreateDocumentosActions.ConverteToHtmlSucess(action.payload)
                                ]),
                                catchError(err => of(new AtividadeCreateDocumentosActions.ConverteToHtmlFailed(action.payload)))
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
                ofType<AtividadeCreateDocumentosActions.DownloadP7S>(AtividadeCreateDocumentosActions.DOWNLOAD_DOCUMENTO_P7S),
                mergeMap(action => this._componenteDigitalService.downloadP7S(action.payload, {hash: action.payload.hash})
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
                                    return new AtividadeCreateDocumentosActions.DownloadP7SSuccess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new AtividadeCreateDocumentosActions.DownloadP7SFailed(action.payload));
                                })
                            )

                )
            );

    /**
     * Undelete Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    undeleteDocumento: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateDocumentosActions.UndeleteDocumento>(AtividadeCreateDocumentosActions.UNDELETE_DOCUMENTO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Restaurando a documento id ' + action.payload.documento.id + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap(action => this._documentoService.undelete(action.payload.documento).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento',
                                content: 'Documento id ' + action.payload.documento.id + ' restaurada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            return new AtividadeCreateDocumentosActions.UndeleteDocumentoSuccess({
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
                            return of(new AtividadeCreateDocumentosActions.UndeleteDocumentoFailed(payload));
                        })
                    ), 25)
            );
}

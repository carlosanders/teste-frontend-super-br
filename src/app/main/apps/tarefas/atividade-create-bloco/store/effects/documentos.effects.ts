import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
import * as AtividadeBlocoCreateDocumentosActionsAll from '../actions/documentos.actions';
import {getSelectedTarefas} from '../../../store';
import * as fromStore from "../index";
import * as OperacoesActions from "../../../../../../store/actions/operacoes.actions";
import {AssinaturaService} from "../../../../../../../@cdk/services/assinatura.service";
import {ComponenteDigitalService} from "../../../../../../../@cdk/services/componente-digital.service";

@Injectable()
export class AtividadeCreateBlocoDocumentosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _componenteDigitalService: ComponenteDigitalService,
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
                ofType<AtividadeBlocoCreateDocumentosActionsAll.GetDocumentos>(AtividadeBlocoCreateDocumentosActionsAll.GET_DOCUMENTOS_BLOCO),
                switchMap((action) => {

                    const tarefaIds = `in:${action.payload}`;

                    const params = {
                        filter: {
                            'tarefaOrigem.id': tarefaIds,
                            'documentoAvulsoRemessa.id': 'isNull',
                            'juntadaAtual': 'isNull'
                        },
                        limit: 10,
                        offset: 0,
                        sort: {
                            criadoEm: 'DESC'
                        },
                        populate: [
                            'tipoDocumento',
                            'tarefaOrigem',
                            'tarefaOrigem.vinculacoesEtiquetas',
                            'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
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
                    new AtividadeBlocoCreateDocumentosActionsAll.GetDocumentosSuccess({
                        loaded: true,
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    return of(new AtividadeBlocoCreateDocumentosActionsAll.GetDocumentosFailed(err));
                })
            );

    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<AtividadeBlocoCreateDocumentosActionsAll.AtividadeBlocoCreateDocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumento>(AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Apagando a documento id ' + action.payload.documentoId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._documentoService.destroy(action.payload.documentoId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'documento',
                                content: 'Documento id ' + action.payload.documentoId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            new UpdateData<Documento>({
                                id: response.id,
                                schema: documentoSchema,
                                changes: {apagadoEm: response.apagadoEm}
                            });
                            return new AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumentoSuccess(response.id);
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
                            return of(new AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumentoFailed(payload));
                        })
                    );
                }, 25)
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
                ofType<AtividadeBlocoCreateDocumentosActionsAll.ConverteToPdf>(AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_ATIVIDADE),
                mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
                    .pipe(
                        mergeMap(response => [
                            new UpdateData<Documento>({
                                id: response.id,
                                schema: documentoSchema,
                                changes: {componentesDigitais: response.componentesDigitais}
                            }),
                            new AtividadeBlocoCreateDocumentosActionsAll.ConverteToPdfSucess(action.payload)
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new AtividadeBlocoCreateDocumentosActionsAll.ConverteToPdfFailed(action.payload));
                        })
                    ), 25
                )
            );

    @Effect({dispatch: false})
    converteDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.ConverteToPdfSucess>(AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_SUCESS),
                withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
                tap(([action, tarefas]) => {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
                }),
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
                ofType<AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtml>(AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
                mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
                    .pipe(
                        mergeMap(response => [
                            new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                            new AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtmlSucess(action.payload)
                        ]),
                        catchError(err => of(new AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtmlFailed(action.payload)))
                    ), 25
                )
            );

    @Effect({dispatch: false})
    converteDocumentoHtmlSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtmlSucess>(AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_HTML_SUCESS),
                withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
                tap(([action, tarefas]) => {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
                }),
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
                ofType<AtividadeBlocoCreateDocumentosActionsAll.DownloadP7S>(AtividadeBlocoCreateDocumentosActionsAll.DOWNLOAD_DOCUMENTO_P7S),
                mergeMap(action => this._componenteDigitalService.downloadP7S(action.payload)
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
                            return new AtividadeBlocoCreateDocumentosActionsAll.DownloadP7SSuccess(action.payload);
                        }),
                        catchError((err) => {
                            console.log(err);
                            return of(new AtividadeBlocoCreateDocumentosActionsAll.DownloadP7SFailed(action.payload));
                        })
                    ), 25
                )
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
                ofType<AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumento>(AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO),
                mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify(action.payload))
                            .pipe(
                                map(response => new AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoSuccess(response)),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoFailed(err));
                                })
                            ), 25
                ));

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.RemoveAssinaturaDocumento>(AtividadeBlocoCreateDocumentosActionsAll.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap(action => this._documentoService.removeAssinatura(action.payload)
                    .pipe(
                        mergeMap(response => [
                            new AtividadeBlocoCreateDocumentosActionsAll.RemoveAssinaturaDocumentoSuccess(action.payload),
                        ]),
                        catchError((err, caught) => {
                            console.log(err);
                            return of(new AtividadeBlocoCreateDocumentosActionsAll.RemoveAssinaturaDocumentoFailed(action.payload));
                        })
                    ), 25
                ));

    @Effect({dispatch: false})
    removeAssinaturaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.RemoveAssinaturaDocumentoSuccess>(AtividadeBlocoCreateDocumentosActionsAll.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS),
                withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
                tap(([action, tarefas]) => {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
                }),
            );

    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoSuccess>(AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_BLOCO_SUCCESS),
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
                ofType<AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoEletronicamente>(AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
                    mergeMap((response: Assinatura) => [
                        new AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoEletronicamenteSuccess(response),
                        new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                        new OperacoesActions.Resultado({
                            type: 'assinatura',
                            content: `Assinatura id ${response.id} criada com sucesso!`,
                            dateTime: response.criadoEm
                        })
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoEletronicamenteFailed(err));
                    })
                ), 25)
            );

    @Effect({dispatch: false})
    assinaDocumentoEletronicamenteSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.AssinaDocumentoEletronicamenteSuccess>(AtividadeBlocoCreateDocumentosActionsAll.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
                withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
                tap(([action, tarefas]) => {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
                }),
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
                ofType<AtividadeBlocoCreateDocumentosActionsAll.ClickedDocumento>(AtividadeBlocoCreateDocumentosActionsAll.CLICKED_DOCUMENTO_BLOCO),
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
                    const sidebar = 'empty';
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
     * Update Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    updateDocumento: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.UpdateDocumentoBloco>(AtividadeBlocoCreateDocumentosActionsAll.UPDATE_DOCUMENTO_BLOCO),
                mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
                    mergeMap((response: Documento) => [
                        new AtividadeBlocoCreateDocumentosActionsAll.UpdateDocumentoBlocoSuccess(response.id),
                        new AddData<Documento>({data: [response], schema: documentoSchema})
                    ]),
                    catchError((err) => {
                        console.log(err);
                        return of(new AtividadeBlocoCreateDocumentosActionsAll.UpdateDocumentoBlocoFailed(err));
                    })
                ), 25)
            );

    @Effect({dispatch: false})
    updateDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeBlocoCreateDocumentosActionsAll.UpdateDocumentoBlocoSuccess>(AtividadeBlocoCreateDocumentosActionsAll.UPDATE_DOCUMENTO_BLOCO_SUCCESS),
                withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
                tap(([action, tarefas]) => {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
                }),
            );
}

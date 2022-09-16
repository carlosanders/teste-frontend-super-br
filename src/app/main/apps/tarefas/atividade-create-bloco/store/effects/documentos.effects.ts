import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema
} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import * as AtividadeBlocoCreateDocumentosActionsAll from '../actions/documentos.actions';
import {getSelectedTarefas} from '../../../store';
import * as fromStore from '../index';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class AtividadeCreateBlocoDocumentosEffect {
    routerState: any;
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateDocumentosActionsAll.GetDocumentos>(AtividadeBlocoCreateDocumentosActionsAll.GET_DOCUMENTOS_BLOCO),
        mergeMap((action) => {
            const tarefaId = `eq:${action.payload}`;

            const params = {
                filter: {
                    'tarefaOrigem.id': tarefaId,
                    'documentoAvulsoRemessa.id': 'isNull',
                    'juntadaAtual': 'isNull'
                },
                limit: 25,
                offset: 0,
                sort: {
                    id: 'ASC'
                },
                populate: [
                    'tipoDocumento',
                    'tarefaOrigem',
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
                JSON.stringify(params.populate)
            ).pipe(
                mergeMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema, populate: params.populate}),
                    new AtividadeBlocoCreateDocumentosActionsAll.GetDocumentosSuccess({
                        loaded: {
                            id: action.payload
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new AtividadeBlocoCreateDocumentosActionsAll.GetDocumentosFailed(err));
                })
            );
        }),
    ));
    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<AtividadeBlocoCreateDocumentosActionsAll.AtividadeBlocoCreateDocumentosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumento>(AtividadeBlocoCreateDocumentosActionsAll.DELETE_DOCUMENTO_BLOCO),
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
                return new AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumentoSuccess({
                    documentoId: response.id,
                    uuid: response.uuid,
                    tarefaId: action.payload.tarefaId
                });
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
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AtividadeBlocoCreateDocumentosActionsAll.DeleteDocumentoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Converte Documento Success
     *
     * @type {Observable<any>}
     */
    converteDocumentoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateDocumentosActionsAll.ConverteToPdfSucess>(AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_SUCESS),
        withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
        tap(([action, tarefas]) => {
            this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
        }),
    ), {dispatch: false});
    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtml: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtml>(AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                    new AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtmlSucess(action.payload)
                ]),
                catchError(() => of(new AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtmlFailed(action.payload)))
            ), 25
        )
    ));
    /**
     * Converte Documento Html Success
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtmlSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateDocumentosActionsAll.ConverteToHtmlSucess>(AtividadeBlocoCreateDocumentosActionsAll.CONVERTE_DOCUMENTO_HTML_SUCESS),
        withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
        tap(([action, tarefas]) => {
            this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
        }),
    ), {dispatch: false});
    /**
     * Download P7S
     *
     * @type {Observable<any>}
     *
     */
    downloadP7S: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    clickedDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateDocumentosActionsAll.ClickedDocumento>(AtividadeBlocoCreateDocumentosActionsAll.CLICKED_DOCUMENTO_BLOCO),
        tap((action) => {
            let primary: string;
            primary = 'componente-digital/';
            if (action.payload.componentesDigitais[0]) {
                primary += action.payload.componentesDigitais[0].id;
            } else {
                primary += 'default';
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
    ), {dispatch: false});
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: Observable<any> = createEffect(() => this._actions.pipe(
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
    ));
    /**
     * Update Documento Success
     *
     * @type {Observable<any>}
     */
    updateDocumentoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AtividadeBlocoCreateDocumentosActionsAll.UpdateDocumentoBlocoSuccess>(AtividadeBlocoCreateDocumentosActionsAll.UPDATE_DOCUMENTO_BLOCO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
        tap(([, tarefas]) => {
            this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
        }),
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _componenteDigitalService: ComponenteDigitalService,
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

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, filter, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as AtividadeCreateDocumentosActions
    from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-create/store/actions/documentos.actions';
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
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';
import {getBufferingDelete, getDeletingDocumentosId} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {GetTarefa} from '../../../../store';

@Injectable()
export class AtividadeCreateDocumentosEffect {
    routerState: any;

    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateDocumentosActions.GetDocumentos>(AtividadeCreateDocumentosActions.GET_DOCUMENTOS),
        switchMap((action) => {

            let tarefaId = null;

            const routeParams = of('tarefaHandle');
            routeParams.subscribe((param) => {
                tarefaId = `eq:${this.routerState.params[param]}`;
            });

            let params;
            if (!action.payload['filter']) {
                params = {
                    filter: {
                        'tarefaOrigem.id': tarefaId,
                        'juntadaAtual': 'isNull'
                    },
                    limit: 25,
                    offset: 0,
                    sort: {
                        id: 'ASC'
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
        catchError((err) => {
            console.log(err);
            return of(new AtividadeCreateDocumentosActions.GetDocumentosFailed(err));
        })
    ));

    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: any = createEffect(() => this._actions.pipe(
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
    ));

    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<AtividadeCreateDocumentosActions.AtividadeCreateDocumentosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateDocumentosActions.DeleteDocumento>(AtividadeCreateDocumentosActions.DELETE_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Apagando o documento id ' + action.payload.documentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo,
            undo: action.payload.undo
        }))),
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
                    this._store.dispatch(new GetTarefa({id: this.routerState.params['tarefaHandle']}));
                    return new AtividadeCreateDocumentosActions.DeleteDocumentoSuccess({
                        documentoId: response.id,
                        uuid: response.uuid,
                        tarefaId: this.routerState.params['tarefaHandle']
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
                        lote: action.payload.loteId,
                        redo: 'inherent',
                        undo: 'inherent'
                    }));
                    console.log(err);
                    return of(new AtividadeCreateDocumentosActions.DeleteDocumentoFailed(payload));
                })
            );
        }, 25)
    ));

    /**
     * Clicked Documento
     *
     * @type {Observable<any>}
     */
    clickedDocumento: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateDocumentosActions.ClickedDocumento>(AtividadeCreateDocumentosActions.CLICKED_DOCUMENTO),
        tap((action) => {
            let sidebar = 'oficio/dados-basicos';
            if (!action.payload.documentoAvulsoRemessa) {
                sidebar = 'editar/atividade';
            }
            this._router.navigate([this.routerState.url + '/documento/' + action.payload.id, {
                    outlets: {
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
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateDocumentosActions.ConverteToPdf>(AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new AtividadeCreateDocumentosActions.ConverteToPdfSucess(action.payload),
                    new AtividadeCreateDocumentosActions.GetDocumentos()
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new AtividadeCreateDocumentosActions.ConverteToPdfFailed(action.payload));
                })
            )
        )
    ));

    /**
     * Converte Documento HTML
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtml: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateDocumentosActions.ConverteToHtml>(AtividadeCreateDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({
                        data: response['entities'],
                        schema: componenteDigitalSchema
                    }),
                    new AtividadeCreateDocumentosActions.ConverteToHtmlSucess(action.payload),
                    new AtividadeCreateDocumentosActions.GetDocumentos()
                ]),
                catchError(() => of(new AtividadeCreateDocumentosActions.ConverteToHtmlFailed(action.payload)))
            )
        )
    ));

    /**
     * Download P7S
     *
     * @type {Observable<any>}
     *
     * */
    downloadP7S: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateDocumentosActions.DownloadP7S>(AtividadeCreateDocumentosActions.DOWNLOAD_DOCUMENTO_P7S),
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
                    return new AtividadeCreateDocumentosActions.DownloadP7SSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new AtividadeCreateDocumentosActions.DownloadP7SFailed(action.payload));
                })
            )
        )
    ));

    /**
     * Undelete Documento
     *
     * @type {Observable<any>}
     */
    undeleteDocumento: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateDocumentosActions.UndeleteDocumento>(AtividadeCreateDocumentosActions.UNDELETE_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Restaurando o documento id ' + action.payload.documento.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._documentoService.undelete(action.payload.documento).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Documento id ' + action.payload.documento.id + ' restaurado com sucesso.',
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
                    content: 'Erro ao restaurar o documento id ' + action.payload.documento.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new AtividadeCreateDocumentosActions.UndeleteDocumentoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
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

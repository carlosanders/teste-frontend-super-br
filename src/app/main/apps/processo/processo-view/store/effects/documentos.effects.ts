import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, filter, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as ProcessoViewDocumentosActions from '../actions/documentos.actions';
import {AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema,
    vinculacaoDocumento as vinculacaoDocumentoSchema
} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {getBufferingDelete, getDeletingDocumentosId} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {GetTarefa} from '../../../../tarefas/tarefa-detail/store';
import {GetJuntadaDocumentoVinculado} from '../actions';
import {ProcessoService} from '@cdk/services/processo.service';

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
            } else if(action.payload.componenteDigital) {
                componenteDigital = action.payload.componenteDigital;
                primary += componenteDigital.id;
            } else {
                primary += '0';
            }

            let sidebar = action.payload.routeOficio + '/dados-basicos';

            // eslint-disable-next-line max-len
            if (!action.payload.documento?.documentoAvulsoRemessa && action.payload.documento?.minuta && !action.payload.documento?.estaVinculada && !action.payload.componenteDigital?.documentoOrigem ) {
                sidebar = 'editar/' + action.payload.routeAtividade;
            } else if (!action.payload.documento?.minuta || action.payload.documento?.estaVinculada || action.payload.componenteDigital?.documentoOrigem) {
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
                    return of(new ProcessoViewDocumentosActions.ConverteToPdfFailed({
                        id: action.payload,
                        error: err
                    }));
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
        mergeMap(action => this._vinculacaoDocumentoService.destroy(action.payload.vinculacaoDocumento.id)
            .pipe(
                mergeMap(() => [
                    new RemoveChildData({
                        id: action.payload.vinculacaoDocumento.id,
                        childSchema: vinculacaoDocumentoSchema,
                        parentSchema: documentoSchema,
                        parentId: action.payload.documentoId
                    }),
                    new GetJuntadaDocumentoVinculado(action.payload.vinculacaoDocumento.documentoVinculado),
                    new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoSuccess(action.payload.vinculacaoDocumento.id),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoFailed(action.payload.vinculacaoDocumento.id));
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

    deleteVisibilidadeDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewDocumentosActions.DeleteVisibilidadeDocumentos>(ProcessoViewDocumentosActions.DELETE_VISIBILIDADE_DOCUMENTOS),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'processo',
            content: 'Removendo restrições dos documentos do processo ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._processoService.destroyVisibilidadeDocs(action.payload.processoId)
            .pipe(
                mergeMap((response: any) => [
                    new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'processo',
                        content: 'Restrições dos documentos de id '
                            + response.id + ' do processo id '
                            + action.payload.processoId + ' removidas com sucesso.',
                        status: 1, // sucesso
                    }),
                    new ProcessoViewDocumentosActions.DeleteVisibilidadeDocumentosSuccess(response),
                ]),
                catchError((err) => {
                    const payload = {
                        processoId: action.payload.processoId,
                        error: err
                    };
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'processo',
                        content: 'Erro ao remover restrições de juntada!',
                        status: 2, // erro
                    }));
                    return of(new ProcessoViewDocumentosActions.DeleteVisibilidadeDocumentosFailed(payload));
                })
            )
        )
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
        private _processoService: ProcessoService,
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

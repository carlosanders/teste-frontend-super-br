import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
import * as MinutasActions from '../actions/minutas.actions';
import {getSelectedTarefas} from '../../../store';
import * as fromStore from '../index';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class MinutasEffects {
    routerState: any;
    /**
     * Get Documentos with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.GetDocumentos>(MinutasActions.GET_DOCUMENTOS_BLOCO),
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
            new MinutasActions.GetDocumentosSuccess({
                loaded: true,
                entitiesId: response['entities'].map(documento => documento.id),
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new MinutasActions.GetDocumentosFailed(err));
        })
    ));
    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<MinutasActions.MinutasActionsAll> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.DeleteDocumento>(MinutasActions.DELETE_DOCUMENTO_BLOCO),
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
                return new MinutasActions.DeleteDocumentoSuccess(response.id);
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
                return of(new MinutasActions.DeleteDocumentoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.ConverteToPdf>(MinutasActions.CONVERTE_DOCUMENTO_ATIVIDADE),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new MinutasActions.ConverteToPdfSucess(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new MinutasActions.ConverteToPdfFailed(action.payload));
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
        ofType<MinutasActions.ConverteToPdfSucess>(MinutasActions.CONVERTE_DOCUMENTO_SUCESS),
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
        ofType<MinutasActions.ConverteToHtml>(MinutasActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                    new MinutasActions.ConverteToHtmlSucess(action.payload)
                ]),
                catchError(() => of(new MinutasActions.ConverteToHtmlFailed(action.payload)))
            ), 25
        )
    ));
    /**
     * Converte Documento Html Success
     *
     * @type {Observable<any>}
     */
    converteDocumentoHtmlSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.ConverteToHtmlSucess>(MinutasActions.CONVERTE_DOCUMENTO_HTML_SUCESS),
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
        ofType<MinutasActions.DownloadP7S>(MinutasActions.DOWNLOAD_DOCUMENTO_P7S),
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
                    return new MinutasActions.DownloadP7SSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new MinutasActions.DownloadP7SFailed(action.payload));
                })
            ), 25
        )
    ));
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.AssinaDocumento>(MinutasActions.ASSINA_DOCUMENTO_BLOCO),
        mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify(action.payload))
            .pipe(
                map(response => new MinutasActions.AssinaDocumentoSuccess(response)),
                catchError((err) => {
                    console.log(err);
                    return of(new MinutasActions.AssinaDocumentoFailed(err));
                })
            ), 25)
    ));
    /**
     * Remove Assinatura Documento
     *
     * @type {Observable<any>}
     */
    removeAssinaturaDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.RemoveAssinaturaDocumento>(MinutasActions.REMOVE_ASSINATURA_DOCUMENTO),
        mergeMap(action => this._documentoService.removeAssinatura(action.payload)
            .pipe(
                mergeMap(() => [
                    new MinutasActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new MinutasActions.RemoveAssinaturaDocumentoFailed(action.payload));
                })
            ), 25)
    ));
    /**
     * Remove Assinatura Documento Success
     *
     * @type {Observable<any>}
     */
    removeAssinaturaDocumentoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.RemoveAssinaturaDocumentoSuccess>(MinutasActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
        tap(([action, tarefas]) => {
            this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
        }),
    ), {dispatch: false});
    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    assinaDocumentoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.AssinaDocumentoSuccess>(MinutasActions.ASSINA_DOCUMENTO_BLOCO_SUCCESS),
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
        ofType<MinutasActions.AssinaDocumentoEletronicamente>(MinutasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Salvando a assinatura ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Assinatura) => [
                new MinutasActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documento.id),
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
                    lote: action.payload.loteId
                }));
                return of(new MinutasActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));
    /**
     * Assinaa Documento Eletronicamente Success
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamenteSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        // eslint-disable-next-line max-len
        ofType<MinutasActions.AssinaDocumentoEletronicamenteSuccess>(MinutasActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
        withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
        tap(([action, tarefas]) => {
            this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
        }),
    ), {dispatch: false});
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.UpdateDocumentoBloco>(MinutasActions.UPDATE_DOCUMENTO_BLOCO),
        mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
            mergeMap((response: Documento) => [
                new MinutasActions.UpdateDocumentoBlocoSuccess(response.id),
                new AddData<Documento>({data: [response], schema: documentoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                return of(new MinutasActions.UpdateDocumentoBlocoFailed(err));
            })
        ), 25)
    ));
    /**
     * Update Documento Success
     *
     * @type {Observable<any>}
     */
    updateDocumentoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MinutasActions.UpdateDocumentoBlocoSuccess>(MinutasActions.UPDATE_DOCUMENTO_BLOCO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
        tap(([action, tarefas]) => {
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

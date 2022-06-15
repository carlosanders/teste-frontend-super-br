import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import * as DocumentosVinculadosActions from '../actions/documentos-vinculados.actions';
import * as fromStore from '../';
import {AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    documento as documentoSchema,
    vinculacaoDocumento as vinculacaoDocumentoSchema
} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CriadoAnexoDocumento, RemovidoAnexoDocumento} from '../../../../store';
import {getDocumentoId} from '../selectors';

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
        withLatestFrom(this._store.pipe(select(getDocumentoId))),
        mergeMap(([action, documentoId]) => {
            const params = {
                filter: {
                    'vinculacaoDocumentoPrincipal.documento.id': `eq:${documentoId}`
                },
                limit: action.payload.limit,
                offset: action.payload.offset,
                sort: {
                    id: 'DESC'
                },
                populate: [
                    'tipoDocumento',
                    'vinculacaoDocumentoPrincipal',
                    'vinculacaoDocumentoPrincipal.documento',
                    'processoOrigem',
                    'setorOrigem',
                    'tarefaOrigem',
                    'tarefaOrigem.usuarioResponsavel',
                    'tarefaOrigem.vinculacoesEtiquetas',
                    'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
                ],
                context: {'incluiVinculacaoDocumentoPrincipal': true}
            };

            return this._documentoService.query(
                JSON.stringify({
                    ...params.filter
                }),
                params.limit,
                params.offset,
                JSON.stringify(params.sort),
                JSON.stringify(params.populate),
                JSON.stringify(params.context)
            ).pipe(
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
            )
        }),
    ));
    getDocumentosVinculadosSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.GetDocumentosVinculadosSuccess>(DocumentosVinculadosActions.GET_DOCUMENTOS_VINCULADOS_SUCCESS),
        withLatestFrom(this._store.select(fromStore.getDocumentosVinculadosPagination), this._store.select(fromStore.getDocumentosVinculadosId)),
        tap(([action, pagination, documentosIds]) => {
            if (action.payload.total > documentosIds.length) {
                this._store.dispatch(new DocumentosVinculadosActions.GetDocumentosVinculados({
                    limit: pagination.limit,
                    offset: pagination.offset + pagination.limit
                }));
            }
        })
    ), {dispatch: false});
    /**
     * Reload Documentos Vinculados
     */
    reloadDocumentosVinculados: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.ReloadDocumentosVinculados>(DocumentosVinculadosActions.RELOAD_DOCUMENTOS_VINCULADOS),
        map(() => {
            this._store.dispatch(new DocumentosVinculadosActions.UnloadDocumentosVinculados({reset: false}));
            this._store.dispatch(new DocumentosVinculadosActions.GetDocumentosVinculados({
                limit: 10,
                offset: 0
            }));
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
                this._store.dispatch(new RemovidoAnexoDocumento(action.payload.documentoId));
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
     * Clicked Documento Vinculado
     *
     * @type {Observable<any>}
     */
    clickedDocumentoVinculado: any = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.ClickedDocumentoVinculado>(DocumentosVinculadosActions.CLICKED_DOCUMENTO_VINCULADO),
        tap((action) => {
            let sidebar = 'editar/dados-basicos';
            if (action.payload.estaVinculada) {
                sidebar = 'editar/dados-basicos';
            }
            // this._componenteDigitalService.trocandoDocumento.next(true);
            this._router.navigate([this.routerState.url.split('/documento/')[0] + '/documento/' + action.payload.id, {
                    outlets: {
                        sidebar: sidebar
                    }
                }],
                {
                    relativeTo: this._activatedRoute.parent
                }).then(() => {
                    console.log('Aqui');
            });
        })
    ), {dispatch: false});
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.UpdateDocumentoVinculado>(DocumentosVinculadosActions.UPDATE_DOCUMENTO_VINCULADO),
        mergeMap((action) => {
            const populate = JSON.stringify([
                'tipoDocumento',
                'atualizadoPor'
            ]);
            return this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}, populate).pipe(
                mergeMap((response: Documento) => [
                    new DocumentosVinculadosActions.UpdateDocumentoVinculadoSuccess(response.id),
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {
                            atualizadoEm: response.atualizadoEm,
                            atualizadoPor: response.atualizadoPor,
                            tipoDocumento: response.tipoDocumento
                        }
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosVinculadosActions.UpdateDocumentoVinculadoFailed(err));
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
        ofType<DocumentosVinculadosActions.DownloadP7SVinculado>(DocumentosVinculadosActions.DOWNLOAD_DOCUMENTO_VINCULADO_P7S),
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
                    return new DocumentosVinculadosActions.DownloadP7SVinculadoSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new DocumentosVinculadosActions.DownloadP7SVinculadoFailed(action.payload));
                })
            ), 25)
    ));
    removeVinculacaoDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.RemoveVinculacaoDocumento>(DocumentosVinculadosActions.REMOVE_VINCULACAO_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento vinculado',
            content: 'Removendo a vinculação id ' + action.payload.vinculacaoDocumento.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoDocumentoService.destroy(action.payload.vinculacaoDocumento.id).pipe(
            mergeMap(() => [
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento vinculado',
                    content: 'Vinculação de juntada id ' + action.payload.vinculacaoDocumento.id + ' removida com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }),
                new RemoveChildData({
                    id: action.payload.vinculacaoDocumento.id,
                    childSchema: vinculacaoDocumentoSchema,
                    parentSchema: documentoSchema,
                    parentId: action.payload.vinculacaoDocumento.documento.id
                }),
                new DocumentosVinculadosActions.RemoveVinculacaoDocumentoSuccess(action.payload.vinculacaoDocumento.id),
                new DocumentosVinculadosActions.ReloadDocumentosVinculados(),
            ]),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoDocumento.id,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento vinculado',
                    content: 'Erro ao apagar a vinculação de documento id' + action.payload.vinculacaoDocumento.id + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new DocumentosVinculadosActions.RemoveVinculacaoDocumentoFailed(payload));
            })
        ))
    ));
    /**
     * Criar anexo por aprovação deve atualizar lista de documentos vinculados
     */
    aprovarComponenteDigital: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.ApproveComponenteDigitalVinculadoSuccess>(DocumentosVinculadosActions.APPROVE_COMPONENTE_DIGITAL_VINCULADO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new CriadoAnexoDocumento(action.payload.documentoOrigem.id));
            if (action.payload.documentoOrigem.id === parseInt(this.routerState.params['documentoHandle'], 10)) {
                this._store.dispatch(new DocumentosVinculadosActions.ReloadDocumentosVinculados());
            }
        })
    ), {dispatch: false});
    /**
     * Anexar por cópia deve atualizar lista de documentos vinculados da minuta atualmente aberta
     */
    saveComponenteDigitalSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentosVinculadosActions.SaveComponenteDigitalDocumentoSuccess>(DocumentosVinculadosActions.SAVE_COMPONENTE_DIGITAL_DOCUMENTO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new CriadoAnexoDocumento(action.payload.documentoOrigem.id));
            if (action.payload.documentoOrigem.id === parseInt(this.routerState.params['documentoHandle'], 10)) {
                this._store.dispatch(new DocumentosVinculadosActions.ReloadDocumentosVinculados());
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _router: Router,
        private _store: Store<State>,
        private _activatedRoute: ActivatedRoute,
        private _componenteDigitalService: ComponenteDigitalService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

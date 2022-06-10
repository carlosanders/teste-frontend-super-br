import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, filter, map, mergeAll, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import * as fromStore from '../';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema
} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class TarefaDetailDocumentosEffects {
    routerState: any;
    /**
     * Update Documento
     *
     * @type {Observable<any>}
     */
    updateDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.UpdateDocumento>(fromStore.UPDATE_DOCUMENTO),
        mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
            mergeMap((response: Documento) => [
                new fromStore.AtualizaEtiquetaMinuta(response.id),
                new fromStore.UpdateDocumentoSuccess(response.id),
                new AddData<Documento>({data: [response], schema: documentoSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                return of(new fromStore.UpdateDocumentoFailed(err));
            })
        ), 25)
    ));
    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    deleteDocumento: Observable<fromStore.TarefaDetailDocumentosActionsAll> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DeleteDocumento>(fromStore.DELETE_DOCUMENTO),
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
        buffer(this._store.pipe(select(fromStore.getBufferingDeleteMinutas))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(fromStore.getDeletingDocumentosId))),
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
                return of(new fromStore.DeleteDocumentoCancelSuccess(action.payload.documentoId));
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
                    this._store.dispatch(new fromStore.RemoveEtiquetaMinutaTarefa({
                        uuid: response.uuid,
                        tarefaId: action.payload.tarefaId
                    }));
                    if (action.payload.documentoAvulsoUuid) {
                        this._store.dispatch(new fromStore.RemoveEtiquetaOficioTarefa({
                            uuid: action.payload.documentoAvulsoUuid,
                            tarefaId: action.payload.tarefaId
                        }));
                    }
                    return new fromStore.DeleteDocumentoSuccess(response.id);
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
                    return of(new fromStore.DeleteDocumentoFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * Undelete Documento
     *
     * @type {Observable<any>}
     */
    undeleteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.UndeleteDocumento>(fromStore.UNDELETE_DOCUMENTO),
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
                this._store.dispatch(new fromStore.GetEtiquetasTarefas(action.payload.tarefaId));
                return new fromStore.UndeleteDocumentoSuccess({
                    documento: response
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
                return of(new fromStore.UndeleteDocumentoFailed(payload));
            })
        ), 25)
    ));
    /**
     * Converte Documento
     *
     * @type {Observable<any>}
     */
    converteDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.ConverteToPdf>(fromStore.CONVERTE_DOCUMENTO),
        mergeMap(action => this._documentoService.convertToPdf(action.payload, {hash: action.payload.hash}, ['componentesDigitais'])
            .pipe(
                mergeMap(response => [
                    new UpdateData<Documento>({
                        id: response.id,
                        schema: documentoSchema,
                        changes: {componentesDigitais: response.componentesDigitais}
                    }),
                    new fromStore.ConverteToPdfSucess(action.payload),
                    new fromStore.AtualizaEtiquetaMinuta(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new fromStore.ConverteToPdfFailed({
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
        ofType<fromStore.ConverteToHtml>(fromStore.CONVERTE_DOCUMENTO_HTML),
        mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
            .pipe(
                mergeMap(response => [
                    new AddData<ComponenteDigital>({
                        data: response['entities'],
                        schema: componenteDigitalSchema
                    }),
                    new fromStore.ConverteToHtmlSucess(action.payload),
                    new fromStore.AtualizaEtiquetaMinuta(action.payload)
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new fromStore.ConverteToHtmlFailed(action.payload));
                })
            ), 25)
    ));
    /**
     * Download P7S
     *
     * @type {Observable<any>}
     **/
    downloadP7S: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<fromStore.DownloadToP7S>(fromStore.DOWNLOAD_DOCUMENTO_P7S),
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
                    return new fromStore.DownloadToP7SSuccess(action.payload);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new fromStore.DownloadToP7SFailed(action.payload));
                })
            ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

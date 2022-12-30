import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoAvulsoEditActions from '../actions';

import {UpdateData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema, documento as documentoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {Documento, DocumentoAvulso} from '@cdk/models';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {UnloadDocumento} from '../../../../store';
import {GetDocumentos as GetDocumentosAtividade} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store';
import {GetDocumentos as GetDocumentosAvulsos} from '../../../../../tarefas/tarefa-detail/oficios/store';
import * as ProcessoViewActions from '../../../../../processo/processo-view/store/actions/processo-view.actions';
import {UnloadComponenteDigital} from '../../../../componente-digital/store';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class DocumentoAvulsoEditEffects {
    routerState: any;
    /**
     * Save DocumentoAvulso
     *
     * @type {Observable<any>}
     */
    saveDocumentoAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoEditActions.SaveDocumentoAvulso>(DocumentoAvulsoEditActions.SAVE_DOCUMENTO_AVULSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento avulso',
            content: 'Salvando o documento avulso ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._documentoAvulsoService.save(action.payload.documentoAvulso).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento avulso',
                content: 'Documento avulso id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: DocumentoAvulso) => [
                new DocumentoAvulsoEditActions.SaveDocumentoAvulsoSuccess(),
                new UpdateData<Documento>({
                    id: action.payload.documentoId,
                    schema: documentoSchema,
                    changes: {documentoAvulsoRemessa: response}
                })
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento avulso',
                    content: 'Erro ao salvar o documento avulso!',
                    status: 2, // erro
                }));
                return of(new DocumentoAvulsoEditActions.SaveDocumentoAvulsoFailed(err));
            })
        ))
    ));
    /**
     * Remeter Documento Avulso
     *
     * @type {Observable<any>}
     */
    remeterDocumentoAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoEditActions.RemeterDocumentoAvulso>(DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO),
        switchMap(action => this._documentoAvulsoService.remeter(action.payload.documentoAvulsoRemessa).pipe(
            mergeMap((response: DocumentoAvulso) => [
                new UpdateData<DocumentoAvulso>({
                    id: response.id, schema: documentoAvulsoSchema,
                    changes: {
                        dataHoraRemessa: response.dataHoraRemessa,
                        usuarioRemessa: response.usuarioRemessa
                    }
                }),
                new DocumentoAvulsoEditActions.RemeterDocumentoAvulsoSuccess({
                    documentoId: action.payload.documentoId,
                    tarefaId: parseInt(this.routerState.params['tarefaHandle'], 10),
                    documentoAvulsoUuid: response.uuid,
                    uuid: action.payload.uuid
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new DocumentoAvulsoEditActions.RemeterDocumentoAvulsoFailed(err));
            })
        ))
    ));
    /**
     * Remeter Documento Avulso
     *
     * @type {Observable<any>}
     */
    toggleEncerramentoDocumentoAvulso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoEditActions.ToggleEncerramentoDocumentoAvulso>(DocumentoAvulsoEditActions.TOGGLE_ENCERRAMENTO_DOCUMENTO_AVULSO),
        switchMap(action => this._documentoAvulsoService.toggleEncerramento(action.payload).pipe(
            mergeMap((response: DocumentoAvulso) => [
                new DocumentoAvulsoEditActions.ToggleEncerramentoDocumentoAvulsoSuccess(),
                new UpdateData<DocumentoAvulso>({
                    id: response.id,
                    schema: documentoAvulsoSchema,
                    changes: {dataHoraEncerramento: response.dataHoraEncerramento}
                })
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoEditActions.ToggleEncerramentoDocumentoAvulsoFailed(err));
        })
    ));
    /**
     * Remeter Documento Avulso Success
     *
     * @type {Observable<any>}
     */
    remeterDocumentoAvulsoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoAvulsoEditActions.RemeterDocumentoAvulsoSuccess>(DocumentoAvulsoEditActions.REMETER_DOCUMENTO_AVULSO_SUCCESS),
        tap(() => {
            this._store.dispatch(new UnloadDocumento());
            this._store.dispatch(new UnloadComponenteDigital());
            let url = this.routerState.url.split('/documento/')[0];
            if (url.indexOf('/capa') !== -1) {
                url += '/mostrar';
            }
            this._router.navigate([url]).then(() => {
                if (url.indexOf('/atividades') !== -1) {
                    this._store.dispatch(new GetDocumentosAtividade());
                } else if (url.indexOf('/oficios') !== -1) {
                    this._store.dispatch(new GetDocumentosAvulsos());
                }
                if (this.routerState.params['stepHandle']) {
                    if (this.routerState.params['stepHandle'] !== 'latest' && this.routerState.params['stepHandle'] !== 'capa') {
                        const steps = this.routerState.params['stepHandle'].split('-');
                        this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                            step: parseInt(steps[0], 10),
                            subStep: parseInt(steps[1], 10)
                        }));
                    } else if (this.routerState.params['stepHandle'] === 'latest') {
                        this._store.dispatch(new ProcessoViewActions.DownloadLatestBinary(this.routerState.params['processoHandle']));
                    } else {
                        this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                    }
                }
            });
        })
    ), {dispatch: false});

    /**
     *
     * @param _actions
     * @param _documentoAvulsoService
     * @param _router
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _documentoAvulsoService: DocumentoAvulsoService,
        private _router: Router,
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

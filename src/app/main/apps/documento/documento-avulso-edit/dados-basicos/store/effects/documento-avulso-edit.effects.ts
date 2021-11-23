import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoAvulsoEditActions from '../actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {DocumentoAvulso} from '@cdk/models';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {UnloadDocumento} from '../../../../store';
import {
    GetDocumentos as GetDocumentosProcesso,
    GetJuntadas,
    UnloadDocumentos,
    UnloadJuntadas
} from '../../../../../processo/processo-view/store';
import {GetDocumentos as GetDocumentosAtividade} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store';
import {GetDocumentos as GetDocumentosAvulsos} from '../../../../../tarefas/tarefa-detail/oficios/store';
import * as ProcessoViewActions from '../../../../../processo/processo-view/store/actions/processo-view.actions';
import {UnloadComponenteDigital} from '../../../../componente-digital/store';
import {GetTarefa} from '../../../../../tarefas/tarefa-detail/store';
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
                new AddData<DocumentoAvulso>({data: [response], schema: documentoAvulsoSchema})
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
        switchMap(action => this._documentoAvulsoService.remeter(action.payload).pipe(
            mergeMap((response: DocumentoAvulso) => [
                new UpdateData<DocumentoAvulso>({
                    id: response.id, schema: documentoAvulsoSchema,
                    changes: {
                        dataHoraRemessa: response.dataHoraRemessa,
                        usuarioRemessa: response.usuarioRemessa
                    }
                }),
                new DocumentoAvulsoEditActions.RemeterDocumentoAvulsoSuccess(),
                new GetTarefa({
                    id: this.routerState.params['tarefaHandle']
                })
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new DocumentoAvulsoEditActions.RemeterDocumentoAvulsoFailed(err));
        })
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
            let reloadJuntadas = false;
            this._store.dispatch(new UnloadComponenteDigital());
            if (this.routerState.url.indexOf('/processo') !== -1) {
                this._store.dispatch(new UnloadJuntadas({reset: false}));
                reloadJuntadas = true;
            }
            let url = this.routerState.url.split('/documento/')[0];
            if (url.indexOf('/processo') !== -1 && url.indexOf('tarefa') !== -1) {
                this._store.dispatch(new UnloadDocumentos());
            }
            if (url.indexOf('/capa') !== -1) {
                url += '/mostrar';
            }
            this._router.navigate([url]).then(() => {
                if (url.indexOf('/atividades') !== -1) {
                    this._store.dispatch(new GetDocumentosAtividade());
                } else if (url.indexOf('/oficios') !== -1) {
                    this._store.dispatch(new GetDocumentosAvulsos());
                } else if (url.indexOf('/processo') !== -1 && url.indexOf('tarefa') !== -1) {
                    this._store.dispatch(new GetDocumentosProcesso());
                }
                if (reloadJuntadas) {
                    let processoFilter = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoFilter = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'volume.processo.id': processoFilter,
                            'vinculada': 'eq:0'
                        },
                        listFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {'volume.numeracaoSequencial': 'DESC', 'numeracaoSequencial': 'DESC'},
                        populate: [
                            'volume',
                            'documento',
                            'documento.origemDados',
                            'documento.tipoDocumento',
                            'documento.componentesDigitais',
                            'documento.vinculacoesDocumentos',
                            'documento.vinculacoesDocumentos.documentoVinculado',
                            'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                            'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais'
                        ]
                    };

                    this._store.dispatch(new GetJuntadas(params));
                    return;
                }
                if (this.routerState.params.stepHandle) {
                    const steps = this.routerState.params['stepHandle'].split('-');
                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                        step: steps[0],
                        subStep: steps[1]
                    }));
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

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {buffer, catchError, map, mergeAll, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as OficiosDocumentosActions from '../actions/documentos.actions';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, ComponenteDigital, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {assinatura as assinaturaSchema, documento as documentoSchema, componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {getBufferingDelete, getDeletingDocumentosId} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

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
                ofType<OficiosDocumentosActions.GetDocumentos>(OficiosDocumentosActions.GET_DOCUMENTOS),
                switchMap(() => {

                    let tarefaId = null;

                    const routeParams = of('tarefaHandle');
                    routeParams.subscribe((param) => {
                        tarefaId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
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
                    new OficiosDocumentosActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new OficiosDocumentosActions.GetDocumentosFailed(err));
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
                ofType<OficiosDocumentosActions.UpdateDocumento>(OficiosDocumentosActions.UPDATE_DOCUMENTO),
                mergeMap(action => this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
                        mergeMap((response: Documento) => [
                            new OficiosDocumentosActions.UpdateDocumentoSuccess(response.id),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new OficiosDocumentosActions.GetDocumentos()
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new OficiosDocumentosActions.UpdateDocumentoFailed(err));
                        })
                    ))
            );

    /**
     * Delete Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<OficiosDocumentosActions.TarefaDetailDocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<OficiosDocumentosActions.DeleteDocumento>(OficiosDocumentosActions.DELETE_DOCUMENTO),
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
                        return of(new OficiosDocumentosActions.DeleteDocumentoCancelSuccess(action.payload.documentoId));
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
                            return new OficiosDocumentosActions.DeleteDocumentoSuccess(response.id);
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
                            return of(new OficiosDocumentosActions.DeleteDocumentoFailed(payload));
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
                ofType<OficiosDocumentosActions.AssinaDocumento>(OficiosDocumentosActions.ASSINA_DOCUMENTO),
                mergeMap(action => this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map(response => new OficiosDocumentosActions.AssinaDocumentoSuccess(response)),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new OficiosDocumentosActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            )
                ));

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<OficiosDocumentosActions.RemoveAssinaturaDocumento>(OficiosDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap(action => this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap(response => [
                                    new OficiosDocumentosActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                    new OficiosDocumentosActions.GetDocumentos(),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new OficiosDocumentosActions.RemoveAssinaturaDocumentoFailed(action.payload));
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
                ofType<OficiosDocumentosActions.AssinaDocumentoSuccess>(OficiosDocumentosActions.ASSINA_DOCUMENTO_SUCCESS),
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
                ofType<OficiosDocumentosActions.AssinaDocumentoEletronicamente>(OficiosDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
                        mergeMap((response: Assinatura) => [
                            new OficiosDocumentosActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new OficiosDocumentosActions.GetDocumentos(),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new OficiosDocumentosActions.AssinaDocumentoEletronicamenteFailed(err));
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
                ofType<OficiosDocumentosActions.ClickedDocumento>(OficiosDocumentosActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    let primary: string;
                    primary = 'componente-digital/';
                    if (action.payload.documento.componentesDigitais[0]) {
                        primary += action.payload.documento.componentesDigitais[0].id;
                    } else {
                        primary += '0';
                    }
                    const sidebar = action.payload.routeOficio + '/dados-basicos';
                    this._router.navigate([this.routerState.url + '/documento/' + action.payload.documento.id, {
                            outlets: {
                                primary: primary,
                                sidebar: sidebar
                            }
                        }],
                        {
                            relativeTo: this.activatedRoute.parent // <--- PARENT activated route.
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
                ofType<OficiosDocumentosActions.ConverteToPdf>(OficiosDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE),
                mergeMap(action => this._componenteDigitalService.preparaConverter(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap(response => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new OficiosDocumentosActions.ConverteToPdfSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new OficiosDocumentosActions.ConverteToPdfFailed(action.payload));
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
                ofType<OficiosDocumentosActions.ConverteToHtml>(OficiosDocumentosActions.CONVERTE_DOCUMENTO_ATIVIDADE_HTML),
                mergeMap(action => this._componenteDigitalService.converterHtml(action.payload, {hash: action.payload.hash})
                            .pipe(
                                mergeMap(response => [
                                    new AddData<ComponenteDigital>({data: response['entities'], schema: componenteDigitalSchema}),
                                    new OficiosDocumentosActions.ConverteToHtmlSucess(action.payload)
                                ]),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new OficiosDocumentosActions.ConverteToHtmlFailed(action.payload));
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
                ofType<OficiosDocumentosActions.UndeleteDocumento>(OficiosDocumentosActions.UNDELETE_DOCUMENTO),
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
                            return new OficiosDocumentosActions.UndeleteDocumentoSuccess({
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
                            return of(new OficiosDocumentosActions.UndeleteDocumentoFailed(payload));
                        })
                    ), 25)
            );
}

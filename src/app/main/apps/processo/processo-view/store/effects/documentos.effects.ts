import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as ProcessoViewDocumentosActions from '../actions/documentos.actions';
import {AddData} from '@cdk/ngrx-normalizr';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {Assinatura, Documento} from '@cdk/models';
import {DocumentoService} from '@cdk/services/documento.service';
import {assinatura as assinaturaSchema, documento as documentoSchema} from '@cdk/normalizr';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {GetJuntadas} from '../actions';
import {getPagination} from '../selectors';

@Injectable()
export class ProcessoViewDocumentosEffects {
    routerState: any;
    routeAtividadeDocumento: string;
    routeOficio: string;

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
        private _router: Router,
        private _store: Store<State>,
        public activatedRoute: ActivatedRoute
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Documentos with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getDocumentos: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.GetDocumentos>(ProcessoViewDocumentosActions.GET_DOCUMENTOS),
                switchMap(() => {

                    let tarefaId = null;

                    const routeParams = of('tarefaHandle');
                    routeParams.subscribe(param => {
                        tarefaId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'tarefaOrigem.id': tarefaId,
                            'juntadaAtual':'isNull'
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
                    new ProcessoViewDocumentosActions.GetDocumentosSuccess({
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params.tarefaHandle
                        },
                        entitiesId: response['entities'].map(documento => documento.id),
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ProcessoViewDocumentosActions.GetDocumentosFailed(err));
                    return caught;
                })
            );

    /**
     * Update Documento
     * @type {Observable<any>}
     */
    @Effect()
    updateDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.UpdateDocumento>(ProcessoViewDocumentosActions.UPDATE_DOCUMENTO),
                mergeMap((action) => {
                    return this._documentoService.patch(action.payload.documento, {tipoDocumento: action.payload.tipoDocumento.id}).pipe(
                        mergeMap((response: Documento) => [
                            new ProcessoViewDocumentosActions.UpdateDocumentoSuccess(response.id),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new ProcessoViewDocumentosActions.GetDocumentos()
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewDocumentosActions.UpdateDocumentoFailed(err));
                        })
                    );
                })
            );

    /**
     * Delete Documento
     * @type {Observable<any>}
     */
    @Effect()
    deleteDocumento: Observable<ProcessoViewDocumentosActions.ProcessoViewDocumentosActionsAll> =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.DeleteDocumento>(ProcessoViewDocumentosActions.DELETE_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.destroy(action.payload).pipe(
                            map((response) => new ProcessoViewDocumentosActions.DeleteDocumentoSuccess(response.id)),
                            catchError((err) => {
                                console.log(err);
                                return of(new ProcessoViewDocumentosActions.DeleteDocumentoFailed(action.payload));
                            })
                        );
                    }
                ));

    /**
     * Assina Documento
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaDocumento>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new ProcessoViewDocumentosActions.AssinaDocumentoSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProcessoViewDocumentosActions.AssinaDocumentoFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Assina Juntada
     * @type {Observable<any>}
     */
    @Effect()
    assinaJuntada: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaJuntada>(ProcessoViewDocumentosActions.ASSINA_JUNTADA),
                mergeMap((action) => {
                        return this._documentoService.preparaAssinatura(JSON.stringify([action.payload]))
                            .pipe(
                                map((response) => {
                                    return new ProcessoViewDocumentosActions.AssinaJuntadaSuccess(response);
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProcessoViewDocumentosActions.AssinaJuntadaFailed(err));
                                    return caught;
                                })
                            );
                    }
                ));

    @Effect()
    removeAssinaturaDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.RemoveAssinaturaDocumento>(ProcessoViewDocumentosActions.REMOVE_ASSINATURA_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.removeAssinatura(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new ProcessoViewDocumentosActions.RemoveAssinaturaDocumentoSuccess(action.payload),
                                    new ProcessoViewDocumentosActions.GetDocumentos(),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    this._store.dispatch(new ProcessoViewDocumentosActions.RemoveAssinaturaDocumentoFailed(action.payload));
                                    return caught;
                                })
                            );
                    }
                ));

    /**
     * Assina Documento Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaDocumentoSuccess>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_SUCCESS),
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
     * Assina Juntada Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaJuntadaSuccess: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaJuntadaSuccess>(ProcessoViewDocumentosActions.ASSINA_JUNTADA_SUCCESS),
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
     * @type {Observable<any>}
     */
    @Effect()
    assinaDocumentoEletronicamente: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaDocumentoEletronicamente>(ProcessoViewDocumentosActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap((action) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({password: action.payload.password})).pipe(
                        mergeMap((response: Assinatura) => [
                            new ProcessoViewDocumentosActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new ProcessoViewDocumentosActions.GetDocumentos(),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewDocumentosActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Juntada Assinatura Eletronica
     * @type {Observable<any>}
     */
    @Effect()
    assinaJuntadaEletronicamente: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.AssinaJuntadaEletronicamente>(ProcessoViewDocumentosActions.ASSINA_JUNTADA_ELETRONICAMENTE),
                withLatestFrom(this._store.pipe(select(getPagination))),
                switchMap(([action, pagination]) => {
                    return this._assinaturaService.save(action.payload.assinatura, JSON.stringify({password: action.payload.password})).pipe(
                        mergeMap((response: Assinatura) => [
                            new ProcessoViewDocumentosActions.AssinaJuntadaEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new GetJuntadas(pagination),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewDocumentosActions.AssinaJuntadaEletronicamenteFailed(err));
                        })
                    );
                })
            );

    /**
     * Clicked Documento
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    clickedDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.ClickedDocumento>(ProcessoViewDocumentosActions.CLICKED_DOCUMENTO),
                tap((action) => {
                    let primary: string;
                    primary = 'componente-digital/';
                    if (action.payload.documento.componentesDigitais[0]) {
                        primary += action.payload.documento.componentesDigitais[0].id;
                    } else {
                        primary += '0';
                    }
                    let sidebar = action.payload.routeOficio + '/dados-basicos';
                    if (!action.payload.documento.documentoAvulsoRemessa && !action.payload.documento.juntadaAtual) {
                        sidebar = 'editar/' + action.payload.routeAtividade;
                    } else if (action.payload.documento.juntadaAtual) {
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
                            relativeTo: this.activatedRoute.parent // <--- PARENT activated route.
                        }).then();

                })
            );

    /**
     * Converte Documento
     * @type {Observable<any>}
     */
    @Effect()
    converteDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.ConverteToPdf>(ProcessoViewDocumentosActions.CONVERTE_DOCUMENTO),
                mergeMap((action) => {
                        return this._documentoService.preparaConverter(action.payload, {hash: action.payload.hash})
                            .pipe(
                                map((response) => {
                                    return new ProcessoViewDocumentosActions.ConverteToPdfSucess(action.payload);
                                }),
                                catchError((err) => {
                                    console.log(err);
                                    return of(new ProcessoViewDocumentosActions.ConverteToPdfFailed(action.payload));
                                })
                            )
                            ;
                    }
                )
            );

    @Effect()
    removeVinculacaoDocumento: any =
        this._actions
            .pipe(
                ofType<ProcessoViewDocumentosActions.RemoveVinculacaoDocumento>(ProcessoViewDocumentosActions.REMOVE_VINCULACAO_DOCUMENTO),
                withLatestFrom(this._store.pipe(select(getPagination))),
                switchMap(([action, pagination]) => {
                        return this._vinculacaoDocumentoService.destroy(action.payload)
                            .pipe(
                                mergeMap((response) => [
                                    new GetJuntadas(pagination),
                                    new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoSuccess(action.payload),
                                ]),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new ProcessoViewDocumentosActions.RemoveVinculacaoDocumentoFailed(action.payload));
                                })
                            );
                    }
                ));

}

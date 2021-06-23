import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoActions from '../actions/documento.actions';
import * as DocumentoSelectors from '../selectors/documento.selectors';

import {DocumentoService} from '@cdk/services/documento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddChildData, AddData, RemoveChildData, UpdateData} from '@cdk/ngrx-normalizr';
import {
    assinatura as assinaturaSchema,
    documento as documentoSchema,
    template as templateSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema
} from '@cdk/normalizr';
import {Assinatura, Documento, Template, VinculacaoEtiqueta} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ModeloService} from '@cdk/services/modelo.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {environment} from 'environments/environment';
import {UnloadDocumento} from '../actions';
import * as AssinaturaActions from '../actions/assinaturas.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {GetDocumentos as GetDocumentosProcesso, UnloadDocumentos} from '../../../processo/processo-view/store';
import {GetDocumentos as GetDocumentosAtividade} from '../../../tarefas/tarefa-detail/atividades/atividade-create/store';
import {GetDocumentos as GetDocumentosAvulsos} from '../../../tarefas/tarefa-detail/oficios/store';

@Injectable()
export class DocumentoEffect {
    routerState: any;
    private _profile: any;
    lixeira = false;
    pesquisa = false;

    /**
     *
     * @param _actions
     * @param _documentoService
     * @param _modeloService
     * @param _repositorioService
     * @param _assinaturaService
     * @param _loginService
     * @param _vinculacaoEtiquetaService
     * @param _router
     * @param _store
     * @param activatedRoute
     */
    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _modeloService: ModeloService,
        private _repositorioService: RepositorioService,
        private _assinaturaService: AssinaturaService,
        public _loginService: LoginService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _router: Router,
        private _store: Store<State>,
        public activatedRoute: ActivatedRoute
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.lixeira = !!routerState.state.queryParams.lixeira;
                    this.pesquisa = !!routerState.state.queryParams.pesquisa;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.GetDocumento>(DocumentoActions.GET_DOCUMENTO),
                switchMap(() => {
                    let handle = {
                        id: '',
                        value: ''
                    };
                    const routeParams = of('documentoHandle');
                    routeParams.subscribe((param) => {
                        if (this.routerState.params[param]) {
                            handle = {
                                id: param,
                                value: this.routerState.params[param]
                            };
                        }
                    });
                    let context = {};
                    if (this.lixeira) {
                        context = {'mostrarApagadas':true};
                    }


                    return this._documentoService.query(
                        `{"id": "eq:${handle.value}"}`,
                        1,
                        0,
                        '{"componentesDigitais.numeracaoSequencial": "ASC"}',
                        JSON.stringify([
                            'procedencia',
                            'setorOrigem',
                            'tipoDocumento',
                            'componentesDigitais',
                            'componentesDigitais.assinaturas',
                            'componentesDigitais.modelo',
                            'modelo',
                            'modelo.template',
                            'modelo.modalidadeModelo',
                            'processoOrigem',
                            'tarefaOrigem',
                            'tarefaOrigem.usuarioResponsavel',
                            'tarefaOrigem.vinculacoesEtiquetas',
                            'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
                            'repositorio',
                            'juntadaAtual',
                            'repositorio.modalidadeRepositorio',
                            'documentoAvulsoRemessa',
                            'documentoAvulsoRemessa.especieDocumentoAvulso',
                            'documentoAvulsoRemessa.processo',
                            'documentoAvulsoRemessa.processo.especieProcesso',
                            'documentoAvulsoRemessa.processo.especieProcesso.generoProcesso',
                            'documentoAvulsoRemessa.modelo',
                            'documentoAvulsoRemessa.setorDestino',
                            'documentoAvulsoRemessa.pessoaDestino',
                            'documentoAvulsoRemessa.usuarioRemessa',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
                        ]),
                        JSON.stringify(context));
                }),
                switchMap(response => [
                    new AddData<Documento>({data: response['entities'], schema: documentoSchema}),
                    new DocumentoActions.GetDocumentoSuccess({
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        documentoId: response['entities'][0].id,
                        // tslint:disable-next-line:max-line-length
                        editavel: (response['entities'][0].documentoAvulsoRemessa && !response['entities'][0].documentoAvulsoRemessa.dataHoraRemessa) || response['entities'][0].minuta,
                        currentComponenteDigitalId: response['entities'][0].componentesDigitais[0] ? response['entities'][0].componentesDigitais[0].id : null
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new DocumentoActions.GetDocumentoFailed(err));
                    return caught;
                })
            );

    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    getDocumentoSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.GetDocumentoSuccess>(DocumentoActions.GET_DOCUMENTO_SUCCESS),
                tap((action) => {
                    if (this.routerState.url.indexOf('anexar-copia') === -1) {
                        if (action.payload.currentComponenteDigitalId) {
                            this._store.dispatch(new DocumentoActions.SetCurrentStep({id: action.payload.currentComponenteDigitalId, editavel: action.payload.editavel}));
                            this._store.dispatch(new AssinaturaActions.GetAssinaturas({
                                filter: {
                                    'componenteDigital.id': 'eq:' + action.payload.currentComponenteDigitalId
                                },
                                limit: 10,
                                offset: 0,
                                sort: {criadoEm: 'DESC'}
                            }));
                        } else {
                            this._router.navigate([
                                    this.routerState.url.split('/componente-digital/')[0] + '/componente-digital/0/empty'
                                ]
                            ).then();
                        }
                    }
                })
            );

    /**
     * Save Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SaveDocumento>(DocumentoActions.SAVE_DOCUMENTO),
                switchMap(action => this._documentoService.save(action.payload).pipe(
                        mergeMap((response: Documento) => [
                            new DocumentoActions.SaveDocumentoSuccess(),
                            new AddData<Documento>({data: [response], schema: documentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'documento',
                                content: `Documento id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.SaveDocumentoFailed(err));
                        })
                    ))
            );

    /**
     * Save Documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTemplate: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SaveTemplate>(DocumentoActions.SAVE_TEMPLATE),
                switchMap(action => this._modeloService.save(action.payload).pipe(
                        mergeMap((response: Template) => [
                            new DocumentoActions.SaveTemplateSuccess(),
                            new AddData<Template>({data: [response], schema: templateSchema}),
                            new OperacoesActions.Resultado({
                                type: 'template',
                                content: `Template id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.SaveTemplateFailed(err));
                        })
                    ))
            );

    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    setCurrentStep: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SetCurrentStep>(DocumentoActions.SET_CURRENT_STEP),
                withLatestFrom(this._store.pipe(select(DocumentoSelectors.getCurrentComponenteDigital))),
                tap(([action, componenteDigital]) => {
                    let type = '/visualizar';
                    const url = this.routerState.url;
                    let sidebar = url.replace(')', '').split('sidebar:')[1]?.split('?')[0];

                    if (action.payload.editavel && componenteDigital.editavel && !componenteDigital.assinado && !componenteDigital.apagadoEm) {
                        type = '/editor/ckeditor';
                        if (!sidebar) {
                            sidebar = 'editar/atividade';
                        }
                    }

                    if (url.indexOf('/assinaturas') > -1) {
                        type = '/assinaturas';
                    }

                    if (componenteDigital.apagadoEm) {
                        sidebar = 'editar/restaurar';
                    }

                    const componenteDigitalHandle = action.payload.id ?? this.routerState.params['componenteDigitalHandle'];

                    this._router.navigate([
                            this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                            {
                                outlets: {
                                    primary: 'componente-digital/' + componenteDigitalHandle + type,
                                    sidebar: sidebar
                                }
                            }
                        ],
                        {
                            relativeTo: this.activatedRoute.parent,
                            queryParams: {
                                lixeira: this.lixeira ? true : null,
                                pesquisa: this.pesquisa ? true : null
                            }
                        }).then();
                })
            );

    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumento: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.AssinaDocumento>(DocumentoActions.ASSINA_DOCUMENTO),
                withLatestFrom(this._store.pipe(select(DocumentoSelectors.getDocumentoId))),
                mergeMap(([action, documentoId]) => this._documentoService.preparaAssinatura(JSON.stringify([parseInt(documentoId, 0)]))
                            .pipe(
                                tap((response: any) => {
                                    if (response.secret) {
                                        const url = environment.jnlp + 'v1/administrativo/assinatura/' + response.secret + '/get_jnlp';
                                        const ifrm = document.createElement('iframe');
                                        ifrm.setAttribute('src', url);
                                        ifrm.style.width = '0';
                                        ifrm.style.height = '0';
                                        ifrm.style.border = '0';
                                        document.body.appendChild(ifrm);
                                        setTimeout(() => document.body.removeChild(ifrm), 20000);
                                    }
                                }),
                                catchError((err, caught) => {
                                    console.log(err);
                                    return of(new DocumentoActions.AssinaDocumentoFailed(err));
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
                ofType<DocumentoActions.AssinaDocumentoSuccess>(DocumentoActions.ASSINA_DOCUMENTO_SUCCESS),
                tap((action) => {
                    this._store.dispatch(new UnloadDocumento());
                    let url = this.routerState.url.split('/documento/')[0];
                    if (url.indexOf('/processo') !== -1) {
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
                        } else if (url.indexOf('/processo') !== -1) {
                            this._store.dispatch(new GetDocumentosProcesso());
                        }
                    });
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
                ofType<DocumentoActions.AssinaDocumentoEletronicamente>(DocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
                switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
                        mergeMap((response: Assinatura) => [
                            new DocumentoActions.AssinaDocumentoEletronicamenteSuccess(response),
                            new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'assinatura',
                                content: `Assinatura id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.AssinaDocumentoEletronicamenteFailed(err));
                        })
                    ))
            );

    /**
     * Assina Documento Eletronicamente Success
     *
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    assinaDocumentoEletronicamenteSuccess: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.AssinaDocumentoEletronicamenteSuccess>(DocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
                tap((action) => {
                    this._store.dispatch(new UnloadDocumento());
                    let url = this.routerState.url.split('/documento/')[0];
                    if (url.indexOf('/processo') !== -1) {
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
                        } else if (url.indexOf('/processo') !== -1) {
                            this._store.dispatch(new GetDocumentosProcesso());
                        }
                    });
                }));

    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    createVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<DocumentoActions.CreateVinculacaoEtiqueta>(DocumentoActions.CREATE_VINCULACAO_ETIQUETA),
                mergeMap((action) => {
                    const vinculacaoEtiqueta = new VinculacaoEtiqueta();
                    vinculacaoEtiqueta.documento = action.payload.documento;
                    vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
                    return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                        tap(response => response.documento = null),
                        mergeMap(response => [
                            new AddChildData<VinculacaoEtiqueta>({
                                data: [response],
                                childSchema: vinculacaoEtiquetaSchema,
                                parentSchema: documentoSchema,
                                parentId: action.payload.documento.id
                            }),
                            new OperacoesActions.Resultado({
                                type: 'documento',
                                content: `Documento id ${action.payload.documento.id} etiquetado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.CreateVinculacaoEtiquetaFailed(err));
                        })
                    );
                })
            );


    /**
     * Save conteúdo vinculação etiqueta no documento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveConteudoVinculacaoEtiqueta: any =
        this._actions
            .pipe(
                ofType<DocumentoActions.SaveConteudoVinculacaoEtiqueta>(DocumentoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
                mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
                        // @retirar: return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta,  {conteudo: action.payload.vinculacaoEtiqueta.conteudo}).pipe(
                        mergeMap(response => [
                            new DocumentoActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                            new UpdateData<VinculacaoEtiqueta>({id: response.id, schema: vinculacaoEtiquetaSchema, changes: {conteudo: response.conteudo, privada: response.privada}})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new DocumentoActions.SaveConteudoVinculacaoEtiquetaFailed(err));
                        })
                    ))
            );



    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoEtiqueta: Observable<any> =
        this._actions
            .pipe(
                ofType<DocumentoActions.DeleteVinculacaoEtiqueta>(DocumentoActions.DELETE_VINCULACAO_ETIQUETA),
                mergeMap(action => this._vinculacaoEtiquetaService.destroy(action.payload.vinculacaoEtiquetaId).pipe(
                            mergeMap(() => [
                                new RemoveChildData({
                                    id: action.payload.vinculacaoEtiquetaId,
                                    childSchema: vinculacaoEtiquetaSchema,
                                    parentSchema: documentoSchema,
                                    parentId: action.payload.documentoId
                                })
                            ]),
                            catchError((err) => {
                                console.log(err);
                                return of(new DocumentoActions.DeleteVinculacaoEtiquetaFailed(action.payload));
                            })
                        )
                ));

}

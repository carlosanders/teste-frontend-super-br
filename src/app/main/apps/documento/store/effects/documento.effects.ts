import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

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
    lixeira = false;
    pesquisa = false;
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumento: Observable<any> = createEffect(() => this._actions.pipe(
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
                context = {'mostrarApagadas': true};
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
        catchError((err) => {
            console.log(err);
            return of(new DocumentoActions.GetDocumentoFailed(err));
        })
    ));
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    getDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.GetDocumentoSuccess>(DocumentoActions.GET_DOCUMENTO_SUCCESS),
        tap((action) => {
            if (this.routerState.url.indexOf('anexar-copia') === -1) {
                if (action.payload.currentComponenteDigitalId) {
                    this._store.dispatch(new DocumentoActions.SetCurrentStep({
                        id: action.payload.currentComponenteDigitalId,
                        editavel: action.payload.editavel
                    }));
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
    ), {dispatch: false});
    /**
     * Save Documento
     *
     * @type {Observable<any>}
     */
    saveDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.SaveDocumento>(DocumentoActions.SAVE_DOCUMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Salvando o documento ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._documentoService.save(action.payload.documento).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'documento',
                content: 'Documento id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Documento) => [
                new DocumentoActions.SaveDocumentoSuccess(),
                new AddData<Documento>({data: [response], schema: documentoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Erro ao salvar o documento!',
                    status: 2, // erro
                }));
                return of(new DocumentoActions.SaveDocumentoFailed(err));
            })
        ))
    ));
    /**
     * Save Documento
     *
     * @type {Observable<any>}
     */
    saveTemplate: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.SaveTemplate>(DocumentoActions.SAVE_TEMPLATE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'template',
            content: 'Salvando o template ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._modeloService.save(action.payload.template).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'template',
                content: 'Template id ' + response.id + ' editado com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Template) => [
                new DocumentoActions.SaveTemplateSuccess(),
                new AddData<Template>({data: [response], schema: templateSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'template',
                    content: 'Erro ao salvar o template.',
                    status: 2, // erro
                }));
                return of(new DocumentoActions.SaveTemplateFailed(err));
            })
        ))
    ));
    /**
     * Get Documento with router parameters
     *
     * @type {Observable<any>}
     */
    setCurrentStep: any = createEffect(() => this._actions.pipe(
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
    ), {dispatch: false});
    /**
     * Assina Documento
     *
     * @type {Observable<any>}
     */
    assinaDocumento: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.AssinaDocumento>(DocumentoActions.ASSINA_DOCUMENTO),
        withLatestFrom(this._store.pipe(select(DocumentoSelectors.getDocumentoId))),
        mergeMap(([action, documentoId]) => this._documentoService.preparaAssinatura(JSON.stringify([parseInt(documentoId, 10)]))
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
                catchError((err) => {
                    const payload = {
                        id: parseInt(documentoId, 10),
                        error: err
                    };
                    console.log(err);
                    return of(new DocumentoActions.AssinaDocumentoFailed(payload));
                })
            ))
    ), {dispatch: false});
    /**
     * Assina Documento Success
     *
     * @type {Observable<any>}
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.AssinaDocumentoSuccess>(DocumentoActions.ASSINA_DOCUMENTO_SUCCESS),
        tap(() => {
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
        })
    ), {dispatch: false});
    /**
     * Save Documento Assinatura Eletronica
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamente: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.AssinaDocumentoEletronicamente>(DocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assinatura',
            content: 'Assinando o documento id ' + action.payload.documentoId + ' ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._assinaturaService.save(action.payload.assinatura).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'assinatura',
                content: 'Assinatura id ' + response.id + ' criada com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Assinatura) => [
                new DocumentoActions.AssinaDocumentoEletronicamenteSuccess(action.payload.documentoId),
                new AddData<Assinatura>({data: [response], schema: assinaturaSchema}),
                new UpdateData<Documento>({
                    id: action.payload.documentoId,
                    schema: documentoSchema,
                    changes: {assinado: true}
                })
            ]),
            catchError((err) => {
                const payload = {
                    documentoId: action.payload.documentoId,
                    error: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assinatura',
                    content: 'Erro ao assinar documento id ' + action.payload.documentoId + '.',
                    status: 2, // erro
                }));
                return of(new DocumentoActions.AssinaDocumentoEletronicamenteFailed(payload));
            })
        ))
    ));
    /**
     * Assina Documento Eletronicamente Success
     *
     * @type {Observable<any>}
     */
    assinaDocumentoEletronicamenteSuccess: any = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.AssinaDocumentoEletronicamenteSuccess>(DocumentoActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
        tap(() => {
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
        })
    ), {dispatch: false});
    /**
     * Create Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    createVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.CreateVinculacaoEtiqueta>(DocumentoActions.CREATE_VINCULACAO_ETIQUETA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'documento',
            content: 'Etiquetando o documento id ' + action.payload.documento.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap((action) => {
            const vinculacaoEtiqueta = new VinculacaoEtiqueta();
            vinculacaoEtiqueta.documento = action.payload.documento;
            vinculacaoEtiqueta.etiqueta = action.payload.etiqueta;
            return this._vinculacaoEtiquetaService.save(vinculacaoEtiqueta).pipe(
                tap(response => response.documento = null),
                tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'documento',
                    content: 'Documento id ' + action.payload.documento.id + ' etiquetado com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap(response => [
                    new AddChildData<VinculacaoEtiqueta>({
                        data: [response],
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: documentoSchema,
                        parentId: action.payload.documento.id
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'documento',
                        content: 'Erro ao etiquetar o documento!',
                        status: 2, // erro
                    }));
                    return of(new DocumentoActions.CreateVinculacaoEtiquetaFailed(err));
                })
            );
        }, 25)
    ));
    /**
     * Save conteúdo vinculação etiqueta no documento
     *
     * @type {Observable<any>}
     */
    saveConteudoVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<DocumentoActions.SaveConteudoVinculacaoEtiqueta>(DocumentoActions.SAVE_CONTEUDO_VINCULACAO_ETIQUETA),
        mergeMap(action => this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta, action.payload.changes).pipe(
            // @retirar: return this._vinculacaoEtiquetaService.patch(action.payload.vinculacaoEtiqueta,  {conteudo: action.payload.vinculacaoEtiqueta.conteudo}).pipe(
            mergeMap(response => [
                new DocumentoActions.SaveConteudoVinculacaoEtiquetaSuccess(response.id),
                new UpdateData<VinculacaoEtiqueta>({
                    id: response.id,
                    schema: vinculacaoEtiquetaSchema,
                    changes: {conteudo: response.conteudo, privada: response.privada}
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new DocumentoActions.SaveConteudoVinculacaoEtiquetaFailed(err));
            })
        ), 25)
    ));
    /**
     * Delete Vinculacao Etiqueta
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoEtiqueta: Observable<any> = createEffect(() => this._actions.pipe(
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
        ), 25)
    ));
    private _profile: any;

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.lixeira = !!routerState.state.queryParams.lixeira;
            this.pesquisa = !!routerState.state.queryParams.pesquisa;
        });

        this._profile = _loginService.getUserProfile();
    }

}

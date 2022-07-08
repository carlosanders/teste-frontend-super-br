import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as VisualizarProcessoActions from '../actions/';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Assunto, ComponenteDigital, Interessado, Juntada, Processo, VinculacaoProcesso} from '@cdk/models';
import {
    assunto as assuntoSchema,
    interessado as interessadoSchema,
    juntada as juntadaSchema,
    processo as processoSchema, vinculacaoProcesso as vinculacaoProcessoSchema
} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CacheModelService} from '@cdk/services/cache.service';
import {CdkProgressBarService} from '@cdk/components/progress-bar/progress-bar.service';
import {getBinary} from '../';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AssuntoService} from '@cdk/services/assunto.service';
import {InteressadoService} from '@cdk/services/interessado.service';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';

@Injectable()
export class VisualizarProcessoEffects {
    routerState: any;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetProcesso>(VisualizarProcessoActions.GET_PROCESSO),
        mergeMap((action) => {
            const contexto = {};

            contexto['compartilhamentoUsuario'] = 'processo';

            let populate = action.payload.populate ? [...action.payload.populate] : [];
            populate = [
                ...populate,
                'origemDados',
                'modalidadeMeio',
                'especieProcesso',
                'especieProcesso.generoProcesso',
                'especieProcesso.vinculacoesEspecieProcessoWorkflow',
                'especieProcesso.vinculacoesEspecieProcessoWorkflow.workflow',
                'setorAtual',
                'setorAtual.especieSetor',
                'setorAtual.unidade',
                'classificacao',
                'classificacao.modalidadeDestinacao',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta',
                'modalidadeFase',
                'procedencia',
                'modalidadeMeio',
                'localizador',
                'criadoPor',
                'atualizadoPor'
            ];
            return this._processoService.get(
                action.payload.id,
                JSON.stringify(populate),
                JSON.stringify(contexto)).pipe(
                switchMap(response => [
                    new AddData<Processo>({data: [response], schema: processoSchema}),
                    new VisualizarProcessoActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoViewHandle',
                            value: this.routerState.params.processoViewHandle,
                            acessoNegado: response.acessoNegado
                        },
                        processoId: response.id
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new VisualizarProcessoActions.GetProcessoFailed(err));
                })
            );
        }),
    ));
    /**
     * Get Processo Success
     */
    getProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetProcessoSuccess>(VisualizarProcessoActions.GET_PROCESSO_SUCCESS),
        tap((action) => {
            this._store.dispatch(new VisualizarProcessoActions.UnloadAssuntos({reset: true}));
            const paramsAssuntos = {
                filter: {'processo.id': `eq:${action.payload.processoId}`, 'principal': 'eq:true'},
                sort: {},
                limit: 10,
                offset: 0,
                populate: ['populateAll']
            };
            this._store.dispatch(new VisualizarProcessoActions.GetAssuntos(paramsAssuntos));
            this._store.dispatch(new VisualizarProcessoActions.UnloadInteressados({reset: true}));
            const paramsInteressados = {
                filter: {'processo.id': `eq:${action.payload.processoId}`},
                sort: {},
                limit: 10,
                offset: 0,
                populate: ['populateAll', 'pessoa']
            };
            this._store.dispatch(new VisualizarProcessoActions.GetInteressados(paramsInteressados));
            this._store.dispatch(new VisualizarProcessoActions.UnloadJuntadasCapa({reset: true}));
            const paramsJuntadas = {
                filter: {'volume.processo.id': `eq:${action.payload.processoId}`},
                sort: {numeracaoSequencial: 'DESC'},
                gridFilter: {},
                limit: 10,
                offset: 0,
                populate: [
                    'populateAll',
                    'documento',
                    'documento.componentesDigitais',
                    'documento.tipoDocumento',
                    'documento.vinculacoesDocumentos',
                    'documento.vinculacoesDocumentos.documentoVinculado',
                    'documento.vinculacoesDocumentos.documentoVinculado.juntadaAtual',
                    'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                    'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
                    'documento.criadoPor',
                    'documento.origemDados',
                    'documento.setorOrigem',
                    'documento.setorOrigem.unidade',
                    'documento.pasta',
                    'documento.procedencia',
                    'documento.componentesDigitais.assinaturas',
                ]
            };
            this._store.dispatch(new VisualizarProcessoActions.GetJuntadasCapa(paramsJuntadas));
            this._store.dispatch(new VisualizarProcessoActions.UnloadVinculacoesProcessos({reset: true}));
            const paramsVinculacoesProcessos = {
                processoId: action.payload.processoId,
                populate: ['populateAll']
            };
            this._store.dispatch(new VisualizarProcessoActions.GetVinculacoesProcessos(paramsVinculacoesProcessos));

        })
    ), {dispatch: false});
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetJuntadas>(VisualizarProcessoActions.GET_JUNTADAS),
        switchMap((action) => {
            const chaveAcesso = {};
            return this._juntadaService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.folderFilter,
                    ...action.payload.listFilter,
                    ...action.payload.etiquetaFilter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(chaveAcesso),
                'app/main/apps/documento/visualizar-processo#juntadas').pipe(
                concatMap(response => [
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new VisualizarProcessoActions.GetJuntadasSuccess({
                        entitiesId: response['entities'].map(juntada => juntada.id),
                        documentosId: response['entities'].map(juntada => juntada.documento.id),
                        ativo: response['entities'].map(juntada => juntada.ativo),
                        processoId: action.payload.processoId,
                        loaded: {
                            id: 'processoViewHandle',
                            value: this.routerState.params.processoViewHandle
                        },
                        default: !!action.payload.default ? this.getDefaultStep(response['entities']) : false,
                        total: response['total']
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._cdkProgressBarService.hide();
                    return of(new VisualizarProcessoActions.GetJuntadasFailed(err));
                })
            );
        }),
    ));
    /**
     * Reload Juntadas with router parameters
     *
     * @type {any}
     */
    reloadJuntadas: any = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.ReloadJuntadas>(VisualizarProcessoActions.RELOAD_JUNTADAS),
        map(() => {
            let processoFilter = null;
            let processoId = null;

            const routeParams = of('processoViewHandle');
            routeParams.subscribe((param) => {
                processoFilter = `eq:${this.routerState.params[param]}`;
                processoId = parseInt(this.routerState.params[param], 10);
            });

            const params = {
                filter: {
                    'volume.processo.id': processoFilter,
                    'vinculada': 'eq:0'
                },
                processoId: processoId,
                default: true,
                listFilter: {},
                limit: 10,
                offset: 0,
                sort: {
                    'numeracaoSequencial': 'DESC',
                },
                populate: [
                    'volume',
                    'documento',
                    'documento.componentesDigitais',
                    'documento.origemDados',
                    'documento.tipoDocumento',
                    'documento.criadoPor',
                    'documento.setorOrigem',
                    'documento.setorOrigem.unidade',
                    'documento.vinculacoesDocumentos',
                    'documento.vinculacoesDocumentos.documentoVinculado',
                    'documento.vinculacoesDocumentos.documentoVinculado.juntadaAtual',
                    'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                    'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
                    'documento.vinculacoesEtiquetas',
                    'documento.vinculacoesEtiquetas.etiqueta'
                ]
            };
            this._store.dispatch(new VisualizarProcessoActions.GetJuntadas(params));
        })
    ), {dispatch: false});
    /**
     * @type {Observable<any>}
     */
    setCurrentStep: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.SetCurrentStep>(VisualizarProcessoActions.SET_CURRENT_STEP),
        withLatestFrom(this._store.pipe(select(getBinary))),
        switchMap(([action, binary]) => {
            const currentStep = {
                step: action.payload.step,
                subStep: action.payload.subStep
            };
            if (currentStep.subStep === null) {
                // nenhum componente digital solicitado ou juntada sem componentes digitais
                return of(new VisualizarProcessoActions.SetCurrentStepFailed(null));
            }
            // temos componente digital, vamos pega-lo
            const contexto = {};
            if (this.routerState.params.chaveAcessoHandle) {
                contexto['chaveAcesso'] = this.routerState.params.chaveAcessoHandle;
            }
            const context = JSON.stringify(contexto);
            if (!binary.src || !binary.src.conteudo || binary.src.id !== currentStep.subStep) {
                this._store.dispatch(new VisualizarProcessoActions.StartLoadingBinary());
                const download$ = this._cacheComponenteDigitalModelService.get(currentStep.subStep)
                    .pipe(
                        switchMap((cachedValue: ComponenteDigital) => {
                            if (cachedValue) {
                                return of(cachedValue);
                            }

                            return this._componenteDigitalService.download(currentStep.subStep)
                                .pipe(
                                    tap((componenteDigital) => {
                                        if (componenteDigital?.mimetype !== 'text/html') {
                                            this._cacheComponenteDigitalModelService.set(componenteDigital, currentStep.subStep)
                                                .subscribe();
                                        }
                                    })
                                );
                        })
                    );

                return download$.pipe(
                    map((response: any) => new VisualizarProcessoActions.SetCurrentStepSuccess({
                        binary: response,
                        loaded: this.routerState.params.stepHandle
                    })),
                    catchError((err) => {
                        console.log(err);
                        return of(new VisualizarProcessoActions.SetCurrentStepFailed(err));
                    })
                );
            } else {
                // Já efetuou o download deste binário no download_latest
                return of(new VisualizarProcessoActions.SetCurrentStepSuccess({
                    binary: binary.src,
                    loaded: this.routerState.params.stepHandle
                }));
            }
        }),
        catchError((err) => {
            console.log(err);
            return of(null);
        })
    ));
    /**
     * Get Juntadas Success
     */
    getJuntadasSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetJuntadasSuccess>(VisualizarProcessoActions.GET_JUNTADAS_SUCCESS),
        tap((action) => {
            if (!!action.payload.default) {
                // Foi feito pedido de alteração de ordenação, a primeira juntada será o novo default
                const currentStep: {
                    step: number;
                    subStep: any;
                } = action.payload.default;
                this._store.dispatch(new VisualizarProcessoActions.SetCurrentStep(currentStep));
            }
        })
    ), {dispatch: false});
    /**
     * @type {Observable<VisualizarProcessoActions.VisualizarProcessoActionsAll>}
     */
    downloadLatestBinary: Observable<VisualizarProcessoActions.VisualizarProcessoActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.DownloadLatestBinary>(VisualizarProcessoActions.DOWNLOAD_LATEST_BINARY),
        switchMap(action => this._componenteDigitalService.downloadLatestByProcessoId(action.payload, '{}').pipe(
            tap((componenteDigital) => {
                if (componenteDigital?.mimetype != 'text/html') {
                    this._cacheComponenteDigitalModelService.set(componenteDigital, action.payload).subscribe();
                }
            }),
            map((response: any) => new VisualizarProcessoActions.DownloadLatestBinarySuccess({
                step: 0,
                subStep: response.id,
                binary: response
            })),
            catchError((err) => {
                console.log(err);
                return of(new VisualizarProcessoActions.DownloadLatestBinaryFailed({processoId: action.payload, error: err.error.message}))
            })
        ))
    ));
    /**
     *
     */
    downloadLatestBinaryFailed: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.DownloadLatestBinaryFailed>(VisualizarProcessoActions.DOWNLOAD_LATEST_BINARY_FAILED),
        tap((action) => {
            this._store.dispatch(new VisualizarProcessoActions.SetCurrentStepFailed(null));
        })
    ), {dispatch: false});
    /**
     * @type {Observable<any>}
     */
    setBinaryView: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.SetBinaryView>(VisualizarProcessoActions.SET_BINARY_VIEW),
        switchMap((action) => {
            const download$ = this._cacheComponenteDigitalModelService.get(action.payload.componenteDigitalId)
                .pipe(
                    switchMap((cachedValue: ComponenteDigital) => {
                        if (cachedValue) {
                            return of(cachedValue);
                        }

                        return this._componenteDigitalService.download(action.payload.componenteDigitalId, '{}')
                            .pipe(
                                tap((componenteDigital) => {
                                    if (componenteDigital?.mimetype !== 'text/html') {
                                        this._cacheComponenteDigitalModelService.set(componenteDigital, action.payload.componenteDigitalId).subscribe();
                                    }
                                })
                            );
                    })
                );

            return download$.pipe(
                map((response: any) => new VisualizarProcessoActions.SetBinaryViewSuccess({
                    binary: response
                })),
                catchError((err) => {
                    console.log(err);
                    return of(new VisualizarProcessoActions.SetBinaryViewFailed(err));
                })
            );
        })
    ));
    /**
     * Get Assuntos Processo
     *
     * @type {Observable<any>}
     */
    getAssuntosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetAssuntos>(VisualizarProcessoActions.GET_ASSUNTOS),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            return this._assuntoService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.listFilter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(contexto));
        }),
        mergeMap(response => [
            new AddData<Assunto>({data: response['entities'], schema: assuntoSchema}),
            new VisualizarProcessoActions.GetAssuntosSuccess({
                entitiesId: response['entities'].map(assunto => assunto.id),
                loaded: {
                    id: 'processoViewHandle',
                    value: this.routerState.params['processoViewHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VisualizarProcessoActions.GetAssuntosFailed(err));
        })
    ));
    /**
     * GetInteressados Processo
     *
     * @type {Observable<any>}
     */
    getInteressadosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetInteressados>(VisualizarProcessoActions.GET_INTERESSADOS),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            return this._interessadoService.query(
                JSON.stringify({
                    ...action.payload.filter,
                    ...action.payload.listFilter,
                    ...action.payload.gridFilter,
                }),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate),
                JSON.stringify(contexto));
        }),
        mergeMap(response => [
            new AddData<Interessado>({data: response['entities'], schema: interessadoSchema}),
            new VisualizarProcessoActions.GetInteressadosSuccess({
                entitiesId: response['entities'].map(interessado => interessado.id),
                loaded: {
                    id: 'processoViewHandle',
                    value: this.routerState.params['processoViewHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VisualizarProcessoActions.GetInteressadosFailed(err));
        })
    ));
    /**
     * GetVinculacoesProcessos Processo
     *
     * @type {Observable<any>}
     */
    getVinculacoesProcessosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetVinculacoesProcessos>(VisualizarProcessoActions.GET_VINCULACOES_PROCESSOS),
        switchMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            return this._vinculacaoProcessoService.findAllVinculacoes(
                action.payload.processoId,
                JSON.stringify(action.payload.populate),
                JSON.stringify(contexto)
            );
        }),
        mergeMap(response => [
            new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
            new VisualizarProcessoActions.GetVinculacoesProcessosSuccess({//o-
                entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
                loaded: {
                    id: 'processoViewHandle',
                    value: this.routerState.params['processoViewHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VisualizarProcessoActions.GetVinculacoesProcessosFailed(err));
        })
    ));

    getJuntadasCapa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisualizarProcessoActions.GetJuntadasCapa>(VisualizarProcessoActions.GET_JUNTADAS_CAPA),
        switchMap(action => this._juntadaService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context))),
        mergeMap(response => [
            new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
            new VisualizarProcessoActions.GetJuntadasCapaSuccess({
                entitiesId: response['entities'].map(juntada => juntada.id),
                loaded: {
                    id: 'processoViewHandle',
                    value: this.routerState.params['processoViewHandle']
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VisualizarProcessoActions.GetJuntadasCapaFailed(err));
        })
    ));

    private _profile: any;

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _juntadaService: JuntadaService,
        private _assuntoService: AssuntoService,
        private _interessadoService: InteressadoService,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
        private _processoService: ProcessoService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router,
        private _cdkProgressBarService: CdkProgressBarService,
        private _cacheComponenteDigitalModelService: CacheModelService<ComponenteDigital>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
        this._cacheComponenteDigitalModelService.initialize(this._loginService.getUserProfile().username, ComponenteDigital);
    }

    getDefaultStep = (juntadas: Juntada[]): { step: number, subStep: number } => {
        let juntadaDefault;
        let defaultStep: {
            step: number,
            subStep: number
        } = {
            step: 0,
            subStep: null
        };
        juntadaDefault = juntadas.find(juntada => {
            return juntada.ativo && (juntada.documento.componentesDigitais.length > 0 || juntada.documento.vinculacoesDocumentos.length > 0);
        });
        if (juntadaDefault) {
            defaultStep.step = juntadaDefault.id;
            defaultStep.subStep = juntadaDefault.documento.componentesDigitais.length ?
                juntadaDefault.documento.componentesDigitais[0].id :
                juntadaDefault.documento.vinculacoesDocumentos[0].documentoVinculado.componentesDigitais[0].id;
        }
        return defaultStep;
    }
}

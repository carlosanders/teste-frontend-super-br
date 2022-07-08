import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as AnexarCopiaActions from '../actions/anexar-copia.actions';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Juntada, Processo} from '@cdk/models';
import {juntada as juntadaSchema, processo as processoSchema} from '@cdk/normalizr';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CacheModelService} from '@cdk/services/cache.service';
import {CdkProgressBarService} from '@cdk/components/progress-bar/progress-bar.service';
import {getBinary} from '../';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class AnexarCopiaEffects {
    routerState: any;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexarCopiaActions.GetProcesso>(AnexarCopiaActions.GET_PROCESSO),
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
                'setorAtual',
                'setorAtual.especieSetor',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta'
            ];
            return this._processoService.get(
                action.payload.id,
                JSON.stringify(populate),
                JSON.stringify(contexto)).pipe(
                switchMap(response => [
                    new AddData<Processo>({data: [response], schema: processoSchema}),
                    new AnexarCopiaActions.GetProcessoSuccess({
                        loaded: {
                            id: 'processoCopiaHandle',
                            value: this.routerState.params.processoCopiaHandle,
                            acessoNegado: response.acessoNegado
                        },
                        processoId: response.id
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new AnexarCopiaActions.GetProcessoFailed(err));
                })
            );
        }),
    ));
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexarCopiaActions.GetJuntadas>(AnexarCopiaActions.GET_JUNTADAS),
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
                'app/main/apps/documento/anexar-copia#juntadas').pipe(
                concatMap(response => [
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new AnexarCopiaActions.GetJuntadasSuccess({
                        entitiesId: response['entities'].map(juntada => juntada.id),
                        documentosId: response['entities'].map(juntada => juntada.documento.id),
                        ativo: response['entities'].map(juntada => juntada.ativo),
                        processoId: action.payload.processoId,
                        loaded: {
                            id: 'processoCopiaHandle',
                            value: this.routerState.params.processoCopiaHandle
                        },
                        default: !!action.payload.default ? this.getDefaultStep(response['entities']) : false,
                        total: response['total']
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._cdkProgressBarService.hide();
                    return of(new AnexarCopiaActions.GetJuntadasFailed(err));
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
        ofType<AnexarCopiaActions.ReloadJuntadas>(AnexarCopiaActions.RELOAD_JUNTADAS),
        map(() => {
            let processoFilter = null;
            let processoId = null;

            const routeParams = of('processoCopiaHandle');
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
            this._store.dispatch(new AnexarCopiaActions.GetJuntadas(params));
        })
    ), {dispatch: false});

    /**
     * @type {Observable<any>}
     */
    setCurrentStep: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexarCopiaActions.SetCurrentStep>(AnexarCopiaActions.SET_CURRENT_STEP),
        withLatestFrom(this._store.pipe(select(getBinary))),
        switchMap(([action, binary]) => {
            const currentStep = {
                step: action.payload.step,
                subStep: action.payload.subStep
            };
            if (currentStep.subStep === null) {
                // nenhum componente digital solicitado ou juntada sem componentes digitais
                return of(new AnexarCopiaActions.SetCurrentStepFailed(null));
            }
            // temos componente digital, vamos pega-lo
            const contexto = {};
            if (this.routerState.params.chaveAcessoHandle) {
                contexto['chaveAcesso'] = this.routerState.params.chaveAcessoHandle;
            }
            const context = JSON.stringify(contexto);

            if (!binary.src || !binary.src.conteudo || binary.src.id !== currentStep.subStep) {
                this._store.dispatch(new AnexarCopiaActions.StartLoadingBinary());
                const download$ = this._cacheComponenteDigitalModelService.get(currentStep.subStep)
                    .pipe(
                        switchMap((cachedValue: ComponenteDigital) => {
                            if (cachedValue) {
                                return of(cachedValue);
                            }

                            return this._componenteDigitalService.download(currentStep.subStep, context)
                                .pipe(tap((componenteDigital) => {
                                    if (componenteDigital?.mimetype !== 'text/html') {
                                        this._cacheComponenteDigitalModelService.set(componenteDigital, currentStep.subStep)
                                            .subscribe();
                                    }
                                }));
                        })
                    );

                return download$.pipe(
                    map((response: any) => new AnexarCopiaActions.SetCurrentStepSuccess({
                        binary: response,
                        loaded: this.routerState.params.stepHandle
                    })),
                    catchError((err) => {
                        console.log(err);
                        return of(new AnexarCopiaActions.SetCurrentStepFailed(err));
                    })
                );
            } else {
                // Já efetuou o download deste binário em algum momento e ainda encontra-se no estado da aplicação
                return of(new AnexarCopiaActions.SetCurrentStepSuccess({
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
        ofType<AnexarCopiaActions.GetJuntadasSuccess>(AnexarCopiaActions.GET_JUNTADAS_SUCCESS),
        tap((action) => {
            if (!!action.payload.default) {
                // Foi feito pedido de alteração de ordenação, a primeira juntada será o novo default
                const currentStep: {
                    step: number;
                    subStep: any;
                } = action.payload.default;
                this._store.dispatch(new AnexarCopiaActions.SetCurrentStep(currentStep));
            }
        })
    ), {dispatch: false});
    /**
     * @type {Observable<AnexarCopiaActions.AnexarCopiaActionsAll>}
     */
    downloadLatestBinary: Observable<AnexarCopiaActions.AnexarCopiaActionsAll> = createEffect(() => this._actions.pipe(
        ofType<AnexarCopiaActions.DownloadLatestBinary>(AnexarCopiaActions.DOWNLOAD_LATEST_BINARY),
        switchMap(action => this._componenteDigitalService.downloadLatestByProcessoId(action.payload, '{}').pipe(
            tap((componenteDigital) => {
                if (componenteDigital?.mimetype != 'text/html') {
                    this._cacheComponenteDigitalModelService.set(componenteDigital, action.payload).subscribe();
                }
            }),
            map((response: any) => new AnexarCopiaActions.DownloadLatestBinarySuccess({
                step: 0,
                subStep: response.id,
                binary: response
            })),
            catchError((err) => {
                console.log(err);
                return of(new AnexarCopiaActions.DownloadLatestBinaryFailed({processoId: action.payload, error: err.error.message}))
            })
        ))
    ));
    /**
     *
     */
    downloadLatestBinaryFailed: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexarCopiaActions.DownloadLatestBinaryFailed>(AnexarCopiaActions.DOWNLOAD_LATEST_BINARY_FAILED),
        tap((action) => {
            this._store.dispatch(new AnexarCopiaActions.SetCurrentStepFailed(null));
        })
    ), {dispatch: false});
    /**
     * @type {Observable<any>}
     */
    setBinaryView: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<AnexarCopiaActions.SetBinaryView>(AnexarCopiaActions.SET_BINARY_VIEW),
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
                map((response: any) => new AnexarCopiaActions.SetCurrentStepSuccess({
                    binary: response
                })),
                catchError((err) => {
                    console.log(err);
                    return of(new AnexarCopiaActions.SetCurrentStepFailed(err));
                })
            );
        })
    ));

    private _profile: any;

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _juntadaService: JuntadaService,
        private _processoService: ProcessoService,
        public _loginService: LoginService,
        private _store: Store<State>,
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

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {JuntadaService} from '@cdk/services/juntada.service';
import {getBinary, getCurrentJuntada} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromStore from '../index';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkProgressBarService} from '@cdk/components/progress-bar/progress-bar.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CacheModelService} from '@cdk/services/cache.service';
import {getProcessoLoaded} from '../../../store';

@Injectable()
export class ProcessoViewEffect {
    routerState: any;
    /**
     * Get Juntada
     *
     * @type {Observable<any>}
     */
    getJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetJuntada>(ProcessoViewActions.GET_JUNTADA),
        switchMap((action) => {
            const chaveAcesso = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
            const populate = [
                'volume',
                'documento',
                'documento.origemDados',
                'documento.tipoDocumento',
                'documento.componentesDigitais',
                'documento.vinculacoesDocumentos',
                'documento.vinculacoesDocumentos.documentoVinculado',
                'documento.vinculacoesDocumentos.documentoVinculado.juntadaAtual',
                'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
                'documento.criadoPor',
                'documento.setorOrigem',
                'documento.setorOrigem.unidade'
            ];
            return this._juntadaService.get(
                action.payload,
                JSON.stringify(populate),
                JSON.stringify(chaveAcesso),
                JSON.stringify({
                    'documento.componentesDigitais.numeracaoSequencial': 'ASC',
                    'documento.vinculacoesDocumentos.id': 'ASC',
                    'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais.numeracaoSequencial': 'ASC'
                })
            ).pipe(
                concatMap(response => [
                    new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                    new ProcessoViewActions.GetJuntadasEtiquetas(response?.documento.id),
                    new ProcessoViewActions.GetJuntadaSuccess(response),
                ]),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewActions.GetJuntadaFailed(err));
                })
            );
        })
    ));
    /**
     * Get Juntadas with router parameters
     *
     * @type {Observable<any>}
     */
    getJuntadas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetJuntadas>(ProcessoViewActions.GET_JUNTADAS),
        switchMap((action) => {
            const chaveAcesso = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};
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
                'app/main/apps/processo/processo-view#juntadas').pipe(
                concatMap(response => [
                    new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
                    new ProcessoViewActions.GetJuntadasSuccess({
                        entitiesId: response['entities'].map(juntada => juntada.id),
                        documentosId: response['entities'].map(juntada => juntada.documento.id),
                        ativo: response['entities'].map(juntada => juntada.ativo),
                        processoId: action.payload.processoId,
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        default: !!action.payload.default ? {
                            step: response['entities'][0].id,
                            subStep: (response['entities'][0].documento?.componentesDigitais.length > 0 ?
                                response['entities'][0].documento.componentesDigitais[0]?.id :
                                response['entities'][0].documento?.vinculacoesDocumentos.length > 0 ?
                                    response['entities'][0].documento.vinculacoesDocumentos[0].documentoVinculado.componentesDigitais[0].id :
                                    null)
                        } : false,
                        total: response['total']
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._cdkProgressBarService.hide();
                    return of(new ProcessoViewActions.GetJuntadasFailed(err));
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
        ofType<ProcessoViewActions.ReloadJuntadas>(ProcessoViewActions.RELOAD_JUNTADAS),
        map(() => {
            let processoFilter = null;
            let processoId = null;

            const routeParams = of('processoHandle');
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
            this._store.dispatch(new fromStore.GetJuntadas(params));
        })
    ), {dispatch: false});

    /**
     * @type {Observable<any>}
     */
    setCurrentStep: Observable<ProcessoViewActions.ProcessoViewActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.SetCurrentStep>(ProcessoViewActions.SET_CURRENT_STEP),
        withLatestFrom(this._store.pipe(select(getProcessoLoaded)), this._store.pipe(select(getBinary))),
        switchMap(([action, processo, binary]) => {
            const currentStep = {
                step: action.payload.step,
                subStep: action.payload.subStep
            };
            const index = processo.juntadaIndex;
            if (!index || index['status'] === 'sem_juntadas') {
                // não tem essa juntada, vamos para capa
                return of(new ProcessoViewActions.GetCapaProcesso());
            } else {
                if (currentStep.subStep === null || (currentStep.step === index['juntadaId'] && index['status'] === 'sem_componentes_digitais')) {
                    // nenhum componente digital solicitado ou juntada sem componentes digitais
                    return of(new ProcessoViewActions.SetCurrentStepFailed(null));
                }
                if (currentStep.step === index['juntadaId'] && index['status'] === 'desentranhada') {
                    // temos documento com acesso negado ou desentranhado
                    return of(new ProcessoViewActions.SetCurrentStepFailed(null));
                }
                // temos componente digital, vamos pega-lo
                const chaveAcesso = this.routerState.params.chaveAcessoHandle ?
                    {chaveAcesso: this.routerState.params.chaveAcessoHandle} : {};
                const context = JSON.stringify(chaveAcesso);

                if (!binary.src || !binary.src.conteudo || binary.src.id !== currentStep.subStep) {
                    this._store.dispatch(new ProcessoViewActions.StartLoadingBinary());
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
                        map((response: any) => new ProcessoViewActions.SetCurrentStepSuccess({
                            binary: response,
                            loaded: this.routerState.params.stepHandle
                        })),
                        catchError((err) => {
                            console.log(err);
                            return of(new ProcessoViewActions.SetCurrentStepFailed(err));
                        })
                    );
                } else {
                    // Já efetuou o download deste binário em algum momento e ainda encontra-se no estado da aplicação
                    return of(new ProcessoViewActions.SetCurrentStepSuccess({
                        binary: binary.src,
                        loaded: this.routerState.params.stepHandle
                    }));
                }
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
        ofType<ProcessoViewActions.GetJuntadasSuccess>(ProcessoViewActions.GET_JUNTADAS_SUCCESS),
        tap((action) => {
            const stepHandle = this.routerState.params['stepHandle'];
            if (stepHandle === 'default' && action.payload.entitiesId.length === 0) {
                this.navegaParaStepSubstep({step: 0, subStep: 0}, false, true);
                return;
            }
            if (!!action.payload.default) {
                // Foi feito pedido de alteração de ordenação, a primeira juntada será o novo default
                const currentStep: {
                    step: number;
                    subStep: any;
                } = action.payload.default;
                this.navegaParaStepSubstep(currentStep);
            }
        })
    ), {dispatch: false});
    /**
     * Get Capa Processo
     *
     * @type {Observable<any>}
     */
    getCapaProcesso: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetCapaProcesso>(ProcessoViewActions.GET_CAPA_PROCESSO),
        map(() => {
            const currentStep = {
                step: 0,
                subStep: 0
            };
            this.navegaParaStepSubstep(currentStep, false, true);
        })
    ), {dispatch: false});
    /**
     * @type {Observable<any>}
     */
    setBinaryView: Observable<ProcessoViewActions.ProcessoViewActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.SetBinaryView>(ProcessoViewActions.SET_BINARY_VIEW),
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
                map((response: any) => new ProcessoViewActions.SetCurrentStepSuccess({
                    binary: response
                })),
                catchError((err) => {
                    console.log(err);
                    return of(new ProcessoViewActions.SetCurrentStepFailed(err));
                })
            );
        })
    ));
    limpaCacheDocumento: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.LimpaCacheDocumento>(ProcessoViewActions.LIMPA_CACHE_DOCUMENTO),
        map(action => action.payload),
        mergeMap(documentoId => of(documentoId).pipe(
            withLatestFrom(this._store.pipe(select(fromStore.getComponentesDigitaisByDocumentoId(documentoId))).pipe(
                map(componentesDigitais => componentesDigitais)
            ))
        ), 25),
        withLatestFrom(this._store.pipe(select(fromStore.getBinary)), this._store.pipe(select(getCurrentJuntada))),
        mergeMap(([[documentoId, componentesDigitais], binary, juntada]) => {
            if (componentesDigitais?.length > 0) {
                componentesDigitais.forEach((componenteDigital) => {
                    if (binary && binary.src && binary.src.conteudo && binary.src.id === componenteDigital.id) {
                        // Tem binário no processo-view, e preciso limpar o conteudo dele para que o setCurrentStep pegue
                        // a versão assinada do backend
                        this._store.dispatch(new fromStore.RemoveConteudoBinario(componenteDigital.id));
                    }
                    // limpa o cache do componente digital do repositório de cache de componentes digitais
                    this._cacheComponenteDigitalModelService.delete(componenteDigital.id).subscribe();
                });
                if (documentoId === juntada?.documento.id) {
                    const stepHandle = this.routerState.params['stepHandle'].split('-');
                    const currentStep = {
                        step: parseInt(stepHandle[0], 10),
                        subStep: parseInt(stepHandle[1], 10)
                    };
                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep(currentStep));
                }
            }
            return of(null);
        }, 25),
        catchError((err) => {
            console.log(err);
            return err;
        })
    ), {dispatch: false});
    atualizaJuntadaIndex: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.AtualizaJuntadaIndex>(ProcessoViewActions.ATUALIZA_JUNTADA_INDEX),
        tap((action) => {
            if (action.payload.reload) {
                if (action.payload.juntadaIndex['status'] !== 'sem_juntadas') {
                    const firstJuntadaId = action.payload.juntadaIndex['id'];
                    const firstComponenteDigitalId = action.payload.juntadaIndex['componenteDigitalId'];
                    const currentStep: {
                        step: number;
                        subStep: any;
                    } = {
                        step: firstJuntadaId,
                        subStep: firstComponenteDigitalId ?? null
                    };
                    // Chamada para o método que redireciona url para uma posição específica
                    this.navegaParaStepSubstep(currentStep, true);
                } else {
                    // Redireciona para a capa pois não tem juntadas
                    this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                }
            } else {
                const stepHandle = this.routerState.params['stepHandle'];
                if (stepHandle && stepHandle !== 'capa' && stepHandle !== 'default') {
                    const currentStep = {
                        step: parseInt(stepHandle.split('-')[0], 10),
                        subStep: stepHandle.split('-')[1] ? parseInt(stepHandle.split('-')[1], 10) : null
                    };
                    this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                }
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _vinculacaoDocumentoService: VinculacaoDocumentoService,
        private _cdkProgressBarService: CdkProgressBarService,
        private _loginService: LoginService,
        private _cacheComponenteDigitalModelService: CacheModelService<ComponenteDigital>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this._cacheComponenteDigitalModelService.initialize(this._loginService.getUserProfile().username, ComponenteDigital);
    }

    navegaParaStepSubstep = (currentStep: {step: number; subStep: number}, reset: boolean = false, capa: boolean = false): void => {
        let stepHandle;
        if (!capa) {
            stepHandle = currentStep['step'];
            if (currentStep['subStep']) {
                stepHandle += '-' + currentStep['subStep'];
            }
        } else {
            stepHandle = 'capa';
        }

        if (this.routerState.url.indexOf('/documento/') !== -1) {
            let sidebar;
            const arrPrimary = [];
            let url = this.routerState.url.split('/documento')[0] + '/documento/' + this.routerState.params.documentoHandle + '/';
            url = url.replace('/default/', '/' + stepHandle + '/');
            if (this.routerState.url.indexOf('visualizar-processo') !== -1) {
                arrPrimary.push('visualizar-processo');
                arrPrimary.push(this.routerState.params.processoHandle);
                if (this.routerState.params.chaveAcessoHandle) {
                    arrPrimary.push('chave');
                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                }
                arrPrimary.push('visualizar');
                arrPrimary.push(stepHandle);
                sidebar = 'empty';
            } else {
                if (this.routerState.params['componenteDigitalHandle']) {
                    arrPrimary.push('componente-digital');
                    arrPrimary.push(this.routerState.params['componenteDigitalHandle']);
                }
                sidebar = null;
            }
            if (this.routerState.url.indexOf('sidebar:') === -1) {
                // Navegação do processo deve ocorrer por outlet
                this._router.navigate(
                    [
                        url,
                        {
                            outlets: {
                                primary: arrPrimary,
                                sidebar: sidebar
                            }
                        }
                    ],
                    {
                        relativeTo: this._activatedRoute.parent
                    }
                ).then(() => {
                    if (reset) {
                        this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
                        this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                        this._store.dispatch(new fromStore.ReloadJuntadas());
                    } else if (!capa) {
                        this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                    }
                });
            } else {
                this._router.navigate(
                    [
                        url,
                        {
                            outlets: {
                                primary: arrPrimary
                            }
                        }
                    ],
                    {
                        relativeTo: this._activatedRoute.parent
                    }
                ).then(() => {
                    if (reset) {
                        this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
                        this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                        this._store.dispatch(new fromStore.ReloadJuntadas());
                    } else if (!capa) {
                        this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                    }
                });
            }
        } else {
            let url = this.routerState.url.split('/processo/' +
                    this.routerState.params.processoHandle)[0] + '/processo/' +
                this.routerState.params.processoHandle;
            if (this.routerState.params.chaveAcessoHandle) {
                url += '/chave/' + this.routerState.params.chaveAcessoHandle;
            }
            url += '/visualizar/';
            if (capa) {
                url += 'capa/mostrar';
            } else {
                url += stepHandle;
            }
            const extras = {
                queryParams: {
                    novaAba: this.routerState.queryParams.novaAba
                }
            };
            this._router.navigate([url], extras).then(() => {
                if (reset) {
                    this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
                    this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                    this._store.dispatch(new fromStore.ReloadJuntadas());
                } else if (!capa) {
                    this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                }
            });
        }
    };
}

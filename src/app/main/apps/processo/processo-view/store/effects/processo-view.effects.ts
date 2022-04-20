import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

import {AddChildData, AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Juntada, VinculacaoDocumento, VinculacaoEtiqueta} from '@cdk/models';
import {
    componenteDigital as componenteDigitalSchema,
    documento as documentoSchema,
    juntada as juntadaSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema,
    vinculacaoDocumento as vinculacaoDocumentoSchema
} from '@cdk/normalizr';
import {JuntadaService} from '@cdk/services/juntada.service';
import {
    getBinary
} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromStore from '../index';
import {
    GetJuntadasEtiquetas,
    GetJuntadasEtiquetasSuccess
} from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';
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
                        documentosVinculacoesId: response['entities'].map(juntada => juntada.ativo && juntada.documento.temAnexos ? juntada.documento.id : null),
                        documentosEtiquetasId: response['entities'].map(juntada => juntada.ativo && juntada.documento.temEtiquetas ? juntada.documento.id : null),
                        temComponentesDigitais: response['entities'].map(juntada => !!juntada.documento.temComponentesDigitais),
                        ativo: response['entities'].map(juntada => juntada.ativo),
                        processoId: action.payload.processoId,
                        loaded: {
                            id: this.routerState.params['processoCopiaHandle'] ?
                                'processoCopiaHandle' : 'processoHandle',
                            value: this.routerState.params['processoCopiaHandle'] ?
                                this.routerState.params.processoCopiaHandle : this.routerState.params.processoHandle
                        },
                        default: !!action.payload.default,
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

            const routeParams = this.routerState.params['processoCopiaHandle'] ? of('processoCopiaHandle') : of('processoHandle');
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
                sort: {'volume.numeracaoSequencial': 'DESC', 'numeracaoSequencial': 'DESC'},
                populate: [
                    'volume',
                    'documento',
                    'documento.origemDados',
                    'documento.tipoDocumento',
                    'documento.criadoPor',
                    'documento.setorOrigem',
                    'documento.setorOrigem.unidade'
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
            const juntada = index.find(indice => indice.id === currentStep.step);
            if (juntada === undefined) {
                // não tem essa juntada, vamos para capa
                return of(new ProcessoViewActions.GetCapaProcesso());
            } else {
                if (juntada.acessoNegado || !juntada.ativo) {
                    // temos documento com acesso negado ou desentranhado
                    return of(new ProcessoViewActions.SetCurrentStepFailed(null));
                }
                if (juntada.componentesDigitais.indexOf(currentStep.subStep) === -1) {
                    // componente digital solicitado no subStep não faz parte do índice da juntada atual
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
                                        if (componenteDigital?.mimetype != 'text/html') {
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
                    // Já efetuou o download deste binário no download_latest
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
     * Reload Juntadas with router parameters
     *
     * @type {any}
     */
    getJuntadasEtiquetas: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetJuntadasEtiquetas>(ProcessoViewActions.GET_JUNTADAS_ETIQUETAS),
        mergeMap(action => this._vinculacaoEtiquetaService.query(
                JSON.stringify({
                    'documento.id': 'eq:' + action.payload,
                }),
                25,
                0,
                JSON.stringify({}),
                JSON.stringify(['etiqueta'])).pipe(
                mergeMap(response => [
                    new GetJuntadasEtiquetasSuccess(response),
                    new AddChildData<VinculacaoEtiqueta>({
                        data: response['entities'],
                        childSchema: vinculacaoEtiquetaSchema,
                        parentSchema: documentoSchema,
                        parentId: action.payload
                    })
                ]),
            ), 25
        ),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoViewActions.GetJuntadasEtiquetasFailed(err));
        })
    ));
    /**
     * Get Juntadas Success
     */
    getJuntadasSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetJuntadasSuccess>(ProcessoViewActions.GET_JUNTADAS_SUCCESS),
        withLatestFrom(this._store.pipe(select(getProcessoLoaded))),
        tap(([action, processoLoaded]) => {
            const stepHandle = this.routerState.params['stepHandle'];
            if (stepHandle === 'default' && action.payload.entitiesId.length === 0) {
                this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                    step: 'capa'
                }));
                return;
            }
            if (!!action.payload.default) {
                // Foi feito pedido de alteração de ordenação, a primeira juntada será o novo default
                const step = action.payload.entitiesId[0];
                const currentStep: {
                    step: number,
                    subStep: number
                } = {
                    step: undefined,
                    subStep: undefined
                };
                const firstJuntada = processoLoaded.juntadaIndex.find(juntada => juntada.id === step);
                if (firstJuntada !== undefined) {
                    currentStep.step = step;
                    currentStep.subStep = firstJuntada.componentesDigitais[0];
                    this.navegaParaStepSubstep(currentStep);
                } else {
                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                        step: 'capa'
                    }));
                }
            }
            action.payload.entitiesId.forEach((juntadaId, juntadaIndice) => {
                // Não pede componentes digitais de juntadas desentranhadas
                if (action.payload.ativo[juntadaIndice] && action.payload.temComponentesDigitais[juntadaIndice]) {
                    this._store.dispatch(new fromStore.GetComponentesDigitaisJuntada({
                        juntadaId: juntadaId,
                        documentoId: action.payload.documentosId[juntadaIndice],
                        documentoVinculacao: !!action.payload.documentosVinculacoesId[juntadaIndice],
                        processoId: action.payload.processoId,
                        filter: {
                            'documento.id': 'eq:' + action.payload.documentosId[juntadaIndice]
                        },
                        limit: 25,
                        offset: 0,
                        sort: {
                            'numeracaoSequencial': 'ASC'
                        },
                        populate: []
                    }));
                }
                if (action.payload.ativo[juntadaIndice] && !!action.payload.documentosVinculacoesId[juntadaIndice] && action.payload.documentosId[juntadaIndice]) {
                    this._store.dispatch(new fromStore.GetDocumentosVinculadosJuntada({
                        juntadaId: juntadaId,
                        documentoId: action.payload.documentosId[juntadaIndice],
                        processoId: action.payload.processoId,
                        filter: {
                            'documento.id': 'eq:' + action.payload.documentosId[juntadaIndice]
                        },
                        limit: 25,
                        offset: 0,
                        sort: {
                            'id': 'ASC',
                            'documentoVinculado.componentesDigitais.numeracaoSequencial': 'ASC'
                        },
                        populate: [
                            'documentoVinculado',
                            'documentoVinculado.juntadaAtual',
                            'documentoVinculado.tipoDocumento',
                            'documentoVinculado.componentesDigitais',
                        ]
                    }));
                }
            });
            action.payload.documentosEtiquetasId.forEach((documentoId) => {
                if (documentoId) {
                    this._store.dispatch(new GetJuntadasEtiquetas(documentoId));
                }
            });
        })
    ), {dispatch: false});
    getComponentesDigitaisJuntada: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetComponentesDigitaisJuntada>(ProcessoViewActions.GET_COMPONENTES_DIGITAIS_JUNTADA),
        mergeMap(action => this._componenteDigitalService.query(
            JSON.stringify(action.payload.filter),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate)).pipe(
            mergeMap(response => [
                new AddChildData<ComponenteDigital>({
                    data: response['entities'],
                    childSchema: componenteDigitalSchema,
                    parentSchema: documentoSchema,
                    parentId: action.payload.documentoId
                }),
                new ProcessoViewActions.GetComponentesDigitaisJuntadaSuccess({
                    juntadaId: action.payload.juntadaId,
                    processoId: action.payload.processoId,
                    documentoId: action.payload.documentoId,
                    documentoVinculacao: action.payload.documentoVinculacao,
                    entitiesId: response['entities'].map(cd => cd.id),
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                const payload = {
                    id: action.payload.juntadaId,
                    processoId: action.payload.processoId,
                    error: err
                };
                return of(new ProcessoViewActions.GetComponentesDigitaisJuntadaFailed(payload));
            })
        ), 25)
    ));
    /**
     * GetComponentesDigitaisJuntadaSuccess
     *
     * @type {any}
     */
    getComponentesDigitaisJuntadaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetComponentesDigitaisJuntadaSuccess>(ProcessoViewActions.GET_COMPONENTES_DIGITAIS_JUNTADA_SUCCESS),
        map(action => action),
        mergeMap(action => of(action).pipe(
            withLatestFrom(this._store.pipe(select(fromStore.getPaginadoresComponentesStateByJuntadaId(action.payload.juntadaId))).pipe(
                map(paginadores => paginadores)
            ))
        ), 25),
        tap(([action, paginadoresComponentesDigitais]) => {
            const entitiesId = [...paginadoresComponentesDigitais.entitiesId];
            if (action.payload.total > entitiesId.length) {
                const paginationComponentesDigitais = paginadoresComponentesDigitais.pagination;
                this._store.dispatch(new fromStore.GetComponentesDigitaisJuntada({
                    juntadaId: action.payload.juntadaId,
                    documentoId: action.payload.documentoId,
                    processoId: action.payload.processoId,
                    filter: {
                        'documento.id': 'eq:' + action.payload.documentoId
                    },
                    limit: paginationComponentesDigitais.limit,
                    offset: paginationComponentesDigitais.offset + paginationComponentesDigitais.limit,
                    sort: {
                        'numeracaoSequencial': 'ASC'
                    },
                    populate: []
                }));
            }
        })
    ), {dispatch: false});

    /**
     * GetDocumentosVinculadosJuntada
     *
     * @type {any}
     */
    getDocumentosVinculadosJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetDocumentosVinculadosJuntada>(ProcessoViewActions.GET_DOCUMENTOS_VINCULADOS_JUNTADA),
        mergeMap((action) => {
            let vinculacoesDocumentos = [];
            let total = 0;
            return this._vinculacaoDocumentoService.query(
                JSON.stringify(action.payload.filter),
                action.payload.limit,
                action.payload.offset,
                JSON.stringify(action.payload.sort),
                JSON.stringify(action.payload.populate)).pipe(
                map((response) => {
                    vinculacoesDocumentos = response['entities'].map((vinculacao) => {
                        vinculacao.documentoVinculado.vinculacaoDocumentoPrincipal.documento = null;
                        return vinculacao;
                    });
                    total = response.total;
                    return vinculacoesDocumentos;
                }),
                mergeMap(() => [
                    new AddChildData<VinculacaoDocumento>({
                        data: vinculacoesDocumentos,
                        childSchema: vinculacaoDocumentoSchema,
                        parentSchema: documentoSchema,
                        parentId: action.payload.documentoId
                    }),
                    new ProcessoViewActions.GetDocumentosVinculadosJuntadaSuccess({
                        juntadaId: action.payload.juntadaId,
                        documentoId: action.payload.documentoId,
                        processoId: action.payload.processoId,
                        entitiesId: vinculacoesDocumentos.map(vinculacao => vinculacao.id),
                        total: total
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    const payload = {
                        id: action.payload.documentoId,
                        processoId: action.payload.processoId,
                        error: err
                    };
                    return of(new ProcessoViewActions.GetDocumentosVinculadosJuntadaFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * GetDocumentosVinculadosJuntadaSuccess
     *
     * @type {any}
     */
    getDocumentosVinculadosJuntadaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetDocumentosVinculadosJuntadaSuccess>(ProcessoViewActions.GET_DOCUMENTOS_VINCULADOS_JUNTADA_SUCCESS),
        withLatestFrom(this._store.pipe(select(fromStore.getPaginadores))),
        tap(([action, paginadoresDocumentosVinculados]) => {
            const paginadoresJuntada = paginadoresDocumentosVinculados[action.payload.documentoId];
            const pagination = paginadoresJuntada.pagination;
            const vinculacoes = paginadoresJuntada.vinculacoes;
            if (pagination.total > vinculacoes.length && !paginadoresJuntada.loading) {
                const nparams = {
                    juntadaId: action.payload.juntadaId,
                    documentoId: action.payload.documentoId,
                    processoId: action.payload.processoId,
                    filter: {
                        'documento.id': 'eq:' + action.payload.documentoId
                    },
                    limit: 25,
                    offset: pagination.offset + pagination.limit,
                    sort: {
                        'id': 'ASC',
                        'documentoVinculado.componentesDigitais.numeracaoSequencial': 'ASC'
                    },
                    populate: [
                        'documentoVinculado',
                        'documentoVinculado.juntadaAtual',
                        'documentoVinculado.tipoDocumento',
                        'documentoVinculado.componentesDigitais',
                    ]
                };
                this._store.dispatch(new fromStore.GetDocumentosVinculadosJuntada(nparams));
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
            if (this.routerState.url.indexOf('/documento/') !== -1) {
                const arrPrimary = [];
                arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                    'visualizar-processo' : 'anexar-copia');
                arrPrimary.push(this.routerState.params['processoCopiaHandle'] ?
                    this.routerState.params.processoCopiaHandle : this.routerState.params.processoHandle);
                if (this.routerState.params.chaveAcessoHandle) {
                    arrPrimary.push('chave');
                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                }
                arrPrimary.push('visualizar');
                arrPrimary.push('capa');
                arrPrimary.push('mostrar');

                // Navegação do processo deve ocorrer por outlet
                this._router.navigate(
                    [
                        this.routerState.url.split('/documento/')[0] + '/documento/' +
                        this.routerState.params.documentoHandle,
                        {
                            outlets: {
                                primary: arrPrimary
                            }
                        }
                    ],
                    {
                        relativeTo: this._activatedRoute.parent
                    }
                ).then();
            } else {
                let url = this.routerState.url.split('/processo/' +
                        this.routerState.params.processoHandle)[0] + '/processo/' +
                    this.routerState.params.processoHandle;
                if (this.routerState.params.chaveAcessoHandle) {
                    url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                }
                url += '/visualizar/capa/mostrar';

                this._router.navigateByUrl(url).then();
            }
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
                                    if (componenteDigital?.mimetype != 'text/html') {
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
        withLatestFrom(this._store.pipe(select(fromStore.getBinary))),
        mergeMap(([[, componentesDigitais], binary]) => {
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
                const firstJuntada = action.payload.juntadaIndex.find(indice => indice.componentesDigitais.length > 0);
                const currentStep: {
                    step: number,
                    subStep: number
                } = {
                    step: undefined,
                    subStep: undefined
                };
                if (firstJuntada !== undefined) {
                    currentStep.step = firstJuntada.id;
                    currentStep.subStep = firstJuntada.componentesDigitais[0];
                    // Chamada para o método que redireciona url para uma posição específica
                    this.navegaParaStepSubstep(currentStep, true);
                } else {
                    this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                }
            } else {
                const stepHandle = this.routerState.params['stepHandle'];
                const currentStep = {
                    step: parseInt(stepHandle.split('-')[0], 10),
                    subStep: parseInt(stepHandle.split('-')[1], 10)
                };
                this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
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

    navegaParaStepSubstep = (currentStep: {step: number, subStep: number}, reset: boolean = false): void => {
        const stepHandle = currentStep['step'] + '-' + currentStep['subStep'];
        if (this.routerState.url.indexOf('/documento/') !== -1) {
            let sidebar;
            const arrPrimary = [];
            const url = this.routerState.url.split('/documento')[0] + '/documento/' + this.routerState.params.documentoHandle + '/';
            if (this.routerState.url.indexOf('anexar-copia') !== -1) {
                arrPrimary.push('anexar-copia');
                arrPrimary.push(this.routerState.params.processoCopiaHandle);
                if (this.routerState.params.chaveAcessoHandle) {
                    arrPrimary.push('chave');
                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                }
                arrPrimary.push('visualizar');
                arrPrimary.push(stepHandle);
                sidebar = 'empty';
            } else if (this.routerState.url.indexOf('visualizar-processo') !== -1) {
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
                    } else {
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
                    } else {
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
            url += '/visualizar/' + stepHandle;
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
                } else {
                    this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
                }
            });
        }
    }
}

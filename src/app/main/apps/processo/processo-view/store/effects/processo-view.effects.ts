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
    getBinary,
    getCurrentStep,
    getIndex,
    getJuntadas,
    getPaginadoresComponentesDigitais,
    getPagination
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

@Injectable()
export class ProcessoViewEffect {
    routerState: any;
    index: any;
    /**
     * Get Juntada
     *
     * @type {Observable<any>}
     */
    getJuntada: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.GetJuntada>(ProcessoViewActions.GET_JUNTADA),
        withLatestFrom(this._store.pipe(select(getJuntadas))),
        switchMap(([action, juntadas]) => {
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
                tap((response) => {
                    this.index = juntadas.map(
                        (juntada) => {
                            let novaJuntada = juntada;
                            if (juntada.id === response.id) {
                                novaJuntada = response;
                            }
                            if (!novaJuntada.ativo) {
                                return [];
                            }
                            let componentesDigitaisIds = [];
                            if (novaJuntada.documento.componentesDigitais) {
                                componentesDigitaisIds = novaJuntada.documento.componentesDigitais.map(
                                    cd => cd.id
                                );
                            }
                            if (novaJuntada.documento.vinculacoesDocumentos) {
                                novaJuntada.documento.vinculacoesDocumentos.map(
                                    (vinculacaoDocumento) => {
                                        vinculacaoDocumento.documentoVinculado.componentesDigitais.map(
                                            cd => componentesDigitaisIds.push(cd.id)
                                        );
                                    }
                                );
                            }
                            return componentesDigitaisIds;
                        }
                    );
                }),
                concatMap(response => [
                    new AddData<Juntada>({data: [response], schema: juntadaSchema}),
                    new ProcessoViewActions.GetJuntadasEtiquetas(response?.documento.id),
                    new ProcessoViewActions.GetJuntadaSuccess(response),
                    new ProcessoViewActions.UpdateIndex(this.index)
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
                        index: response['entities'].map(() => []),
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
        withLatestFrom(this._store.pipe(select(getIndex)), this._store.pipe(select(getCurrentStep)), this._store.pipe(select(getJuntadas)), this._store.pipe(select(getBinary))),
        switchMap(([action, index, currentStep, juntadas, binary]) => {
            let stepHandle = action.payload.step;
            let defaultStep = '0-0';
            if (stepHandle === 'default') {
                let firstJuntada = 0;
                if (index) {
                    firstJuntada = index.findIndex(indice => indice.length > 0);
                    if (firstJuntada === -1) {
                        stepHandle = 'capa';
                    } else {
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
                                arrPrimary.push(firstJuntada + '-0');
                                sidebar = 'empty';
                            } else if (this.routerState.url.indexOf('visualizar-processo') !== -1) {
                                arrPrimary.push('visualizar-processo');
                                arrPrimary.push(this.routerState.params.processoHandle);
                                if (this.routerState.params.chaveAcessoHandle) {
                                    arrPrimary.push('chave');
                                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                                }
                                arrPrimary.push('visualizar');
                                arrPrimary.push(firstJuntada + '-0');
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
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: firstJuntada,
                                        subStep: 0
                                    }));
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
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: firstJuntada,
                                        subStep: 0
                                    }));
                                });
                            }
                        } else {
                            let url = this.routerState.url.split('/processo/' +
                                    this.routerState.params.processoHandle)[0] + '/processo/' +
                                this.routerState.params.processoHandle;
                            if (this.routerState.params.chaveAcessoHandle) {
                                url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                            }
                            url += '/visualizar/' + firstJuntada + '-0';
                            const extras = {
                                queryParams: {
                                    novaAba: this.routerState.queryParams.novaAba
                                }
                            };
                            this._router.navigate([url], extras)
                                .then(() => {
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: firstJuntada,
                                        subStep: 0
                                    }));
                                });
                        }
                        return of(new ProcessoViewActions.StillLoadingBinary());
                    }
                }
            }
            if (stepHandle === 'capa' || stepHandle !== 'capa' && index[currentStep.step] === undefined) {
                // não tem documentos, vamos para capa
                return of(new ProcessoViewActions.GetCapaProcesso());
            } else if (index[currentStep.step][currentStep.subStep] === undefined) {
                // temos documento sem componente digital
                return of(new ProcessoViewActions.SetCurrentStepFailed(null));
            } else {
                const juntada = juntadas[currentStep.step];
                if (juntada.documento.acessoNegado || !juntada.ativo) {
                    // temos documento com acesso negado ou desentranhado
                    return of(new ProcessoViewActions.SetCurrentStepFailed(null));
                }
                // temos componente digital, vamos pega-lo
                const chaveAcesso = this.routerState.params.chaveAcessoHandle ?
                    {chaveAcesso: this.routerState.params.chaveAcessoHandle} : {};
                const context = JSON.stringify(chaveAcesso);
                if (index) {
                    let firstJuntada = 0;
                    firstJuntada = index.findIndex(indice => indice.length > 0);
                    if (firstJuntada > -1) {
                        defaultStep = firstJuntada + '-0';
                    }
                }

                if ((!binary.loading &&
                        (binary.step !== this.routerState.params.stepHandle ||
                            (binary.step === 'default' && this.routerState.params.stepHandle !== defaultStep))) ||
                    (binary.loading && binary.step !== this.routerState.params.stepHandle)) {
                    if ((!binary.src || !binary.src.conteudo || binary.src.id !== index[currentStep.step][currentStep.subStep])) {
                        this._store.dispatch(new ProcessoViewActions.StartLoadingBinary());
                        const download$ = this._cacheComponenteDigitalModelService.get(index[currentStep.step][currentStep.subStep])
                            .pipe(
                                switchMap((cachedValue: ComponenteDigital) => {
                                    if (cachedValue) {
                                        return of(cachedValue);
                                    }

                                    return this._componenteDigitalService.download(index[currentStep.step][currentStep.subStep], context)
                                        .pipe(tap((componenteDigital) => {
                                            if (componenteDigital?.mimetype != 'text/html') {
                                                this._cacheComponenteDigitalModelService.set(componenteDigital, index[currentStep.step][currentStep.subStep]).subscribe();
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
                } else {
                    return of(new ProcessoViewActions.StillLoadingBinary());
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
        withLatestFrom(this._store.pipe(select(getPagination))),
        tap(([action, pagination]) => {
            const stepHandle = this.routerState.params['stepHandle'];
            if (stepHandle === 'default' && action.payload.entitiesId.length === 0) {
                this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                    step: 'capa'
                }));
                return;
            }
            action.payload.entitiesId.forEach((juntadaId, juntadaIndice) => {
                const indice = juntadaIndice + pagination.offset;
                // Não pede componentes digitais de juntadas desentranhadas
                if (action.payload.ativo[juntadaIndice] && action.payload.temComponentesDigitais[juntadaIndice]) {
                    this._store.dispatch(new fromStore.GetComponentesDigitaisJuntada({
                        juntadaId: juntadaId,
                        documentoId: action.payload.documentosId[juntadaIndice],
                        documentoVinculacao: !!action.payload.documentosVinculacoesId[juntadaIndice],
                        juntadaIndice: indice,
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
                    juntadaIndice: action.payload.juntadaIndice,
                    documentoId: action.payload.documentoId,
                    documentoVinculacao: action.payload.documentoVinculacao,
                    entitiesId: response['entities'].map(cd => cd.id),
                    componentesDigitais: response['entities'].map((componenteDigital) => {
                        const componente = {
                            id: componenteDigital.id,
                            numeracaoSequencial: componenteDigital.numeracaoSequencial,
                            vinculacao: 0
                        };
                        return componente;
                    }),
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
            withLatestFrom(this._store.pipe(select(fromStore.getPaginadoresComponentesDigitais)).pipe(
                map(paginadores => paginadores)
            ))
        ), 25),
        tap(([action, paginadoresComponentesDigitais]) => {
            const componentesDigitaisJuntada = [...paginadoresComponentesDigitais[action.payload.juntadaId]?.componentesDigitais];
            componentesDigitaisJuntada.sort((a, b) => (a.vinculacao - b.vinculacao || a.numeracaoSequencial - b.numeracaoSequencial));
            const entitiesId = [...paginadoresComponentesDigitais[action.payload.juntadaId]?.entitiesId];
            const indexNode = componentesDigitaisJuntada.map(c => c.id);
            this._store.dispatch(new ProcessoViewActions.UpdateNode({
                indice: action.payload.juntadaIndice,
                processoId: action.payload.processoId,
                componentesDigitaisIds: indexNode
            }));
            if (action.payload.documentoVinculacao && action.payload.documentoId) {
                this._store.dispatch(new fromStore.GetDocumentosVinculadosJuntada({
                    juntadaId: action.payload.juntadaId,
                    documentoId: action.payload.documentoId,
                    juntadaIndice: action.payload.juntadaIndice,
                    processoId: action.payload.processoId,
                    filter: {
                        'documento.id': 'eq:' + action.payload.documentoId
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
            const stepHandle = this.routerState.params['stepHandle'];
            if (stepHandle === 'default') {
                let lowestIndex = false;
                this._store.select(fromStore.isLowestIndexNull(action.payload.juntadaId)).pipe(
                    filter(result => lowestIndex === false && result !== null)
                ).subscribe((result) => {
                    lowestIndex = !!result;
                    let capa = false;
                    let firstJuntada = -1;
                    if (indexNode.length === 0 || result === false) {
                        this._store.dispatch(new fromStore.SetFirstJuntadaFalse(action.payload.juntadaId));
                        const arrayPaginadores = [];
                        const tmpPaginadores = {
                            ...paginadoresComponentesDigitais,
                            [action.payload.juntadaId]: {
                                ...paginadoresComponentesDigitais[action.payload.juntadaId],
                                firstJuntada: false
                            }
                        };
                        Object.entries(tmpPaginadores).forEach(([, paginador]) => arrayPaginadores.push(paginador));
                        const tmpIndex = arrayPaginadores.filter(paginador => paginador.firstJuntada === null);
                        if (tmpIndex.length === 0) {
                            // Não tem nenhuma juntada com componentes digitais que seja a default, redirecionar para capa
                            capa = true;
                        }
                    }
                    if (indexNode.length > 0 && result === true) {
                        firstJuntada = action.payload.juntadaIndice;
                        this._store.dispatch(new fromStore.SetFirstJuntadaTrue(action.payload.juntadaId));
                    }
                    if (!capa && firstJuntada === parseInt(action.payload.juntadaIndice, 10)) {
                        if (this.routerState.url.indexOf('/documento/') !== -1 && (this.routerState.url.indexOf('anexar-copia') !== -1 ||
                            (this.routerState.url.indexOf('visualizar-processo') !== -1))) {
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
                                arrPrimary.push(firstJuntada + '-0');
                                sidebar = 'empty';
                            } else if (this.routerState.url.indexOf('visualizar-processo') !== -1) {
                                arrPrimary.push('visualizar-processo');
                                arrPrimary.push(this.routerState.params.processoHandle);
                                if (this.routerState.params.chaveAcessoHandle) {
                                    arrPrimary.push('chave');
                                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                                }
                                arrPrimary.push('visualizar');
                                arrPrimary.push(firstJuntada + '-0');
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
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: firstJuntada,
                                        subStep: 0
                                    }));
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
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: firstJuntada,
                                        subStep: 0
                                    }));
                                });
                            }
                        } else if (this.routerState.url.indexOf('/documento/') === -1) {
                            let url = this.routerState.url.split('/processo/' +
                                    this.routerState.params.processoHandle)[0] + '/processo/' +
                                this.routerState.params.processoHandle;
                            if (this.routerState.params.chaveAcessoHandle) {
                                url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                            }
                            url += '/visualizar/' + firstJuntada + '-0';
                            const extras = {
                                queryParams: {
                                    novaAba: this.routerState.queryParams.novaAba
                                }
                            };
                            this._router.navigate([url], extras)
                                .then(() => {
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: firstJuntada,
                                        subStep: 0
                                    }));
                                });
                        }
                    } else if (capa) {
                        this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                            step: 'capa'
                        }));
                    }
                });
            } else if (this.routerState.params['stepHandle'] && this.routerState.params['stepHandle'] !== 'capa' && this.routerState.params['stepHandle'] !== 'default') {
                const steps = this.routerState.params['stepHandle'].split('-');
                if (parseInt(steps[0], 10) === action.payload.juntadaIndice) {
                    const componenteDigitalId = indexNode[steps[1]];
                    if (componenteDigitalId) {
                        const componenteDigital = componentesDigitaisJuntada.find(componente => componente.id === componenteDigitalId);
                        if (componenteDigital && componenteDigital.vinculacao === 0) {
                            // Deve redirecionar, pois é um componente digital da juntada, e não de vinculação, e já está no inedx
                            if (this.routerState.url.indexOf('/documento/') !== -1) {
                                if (this.routerState.url.indexOf('sidebar:') === -1) {
                                    let sidebar;
                                    const arrPrimary = [];
                                    if (this.routerState.url.indexOf('anexar-copia') !== -1) {
                                        arrPrimary.push('anexar-copia');
                                        arrPrimary.push(this.routerState.params.processoHandle);
                                        if (this.routerState.params.chaveAcessoHandle) {
                                            arrPrimary.push('chave');
                                            arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                                        }
                                        arrPrimary.push('visualizar');
                                        arrPrimary.push(this.routerState.params['stepHandle']);
                                        sidebar = 'empty';
                                    } else if (this.routerState.url.indexOf('visualizar-processo') !== -1) {
                                        arrPrimary.push('visualizar-processo');
                                        arrPrimary.push(this.routerState.params.processoHandle);
                                        if (this.routerState.params.chaveAcessoHandle) {
                                            arrPrimary.push('chave');
                                            arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                                        }
                                        arrPrimary.push('visualizar');
                                        arrPrimary.push(this.routerState.params['stepHandle']);
                                        sidebar = 'empty';
                                    } else {
                                        sidebar = null;
                                    }

                                    // Navegação do processo deve ocorrer por outlet
                                    this._router.navigate(
                                        [
                                            this.routerState.url.split('/documento/')[0] + '/documento/' +
                                            this.routerState.params.documentoHandle,
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
                                        this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                            step: steps[0],
                                            subStep: steps[1]
                                        }));
                                    });
                                } else {
                                    this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                        step: steps[0],
                                        subStep: steps[1]
                                    }));
                                }
                            } else {
                                let url = this.routerState.url.split('/processo/' + this.routerState.params.processoHandle)[0]
                                    + '/processo/' + this.routerState.params.processoHandle;
                                if (this.routerState.params.chaveAcessoHandle) {
                                    url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                                }
                                url += '/visualizar/' + this.routerState.params['stepHandle'];
                                const extras = {
                                    queryParams: {
                                        novaAba: this.routerState.queryParams.novaAba
                                    }
                                };
                                this._router.navigate([url], extras)
                                    .then(() => {
                                        this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                            step: steps[0],
                                            subStep: steps[1]
                                        }));
                                    });
                            }
                        }
                    }
                }
            }
            if (action.payload.total > entitiesId.length) {
                const paginationComponentesDigitais = paginadoresComponentesDigitais[action.payload.juntadaId].pagination;
                this._store.dispatch(new fromStore.GetComponentesDigitaisJuntada({
                    juntadaId: action.payload.juntadaId,
                    juntadaIndice: action.payload.juntadaIndice,
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
            const componentesDigitais = [];
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
                    vinculacoesDocumentos.map(
                        (vinculacaoDocumento) => {
                            vinculacaoDocumento.documentoVinculado.componentesDigitais.map(
                                cd => componentesDigitais.push({
                                    id: cd.id,
                                    numeracaoSequencial: cd.numeracaoSequencial,
                                    vinculacao: vinculacaoDocumento.id
                                })
                            );
                        }
                    );
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
                        juntadaIndice: action.payload.juntadaIndice,
                        documentoId: action.payload.documentoId,
                        processoId: action.payload.processoId,
                        entitiesId: vinculacoesDocumentos.map(vinculacao => vinculacao.id),
                        componentesDigitais: componentesDigitais,
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
        withLatestFrom(this._store.pipe(select(getPaginadoresComponentesDigitais)), this._store.pipe(select(fromStore.getPaginadores))),
        tap(([action, paginadoresComponentesDigitais, paginadoresDocumentosVinculados]) => {
            const paginadoresJuntada = paginadoresDocumentosVinculados[action.payload.documentoId];
            const pagination = paginadoresJuntada.pagination;
            const vinculacoes = paginadoresJuntada.vinculacoes;
            const componentesDigitaisJuntada = [...paginadoresComponentesDigitais[action.payload.juntadaId]?.componentesDigitais];
            componentesDigitaisJuntada.sort((a, b) => (a.vinculacao - b.vinculacao || a.numeracaoSequencial - b.numeracaoSequencial));
            const indexNode = componentesDigitaisJuntada.map(c => c.id);
            this._store.dispatch(new ProcessoViewActions.UpdateNode({
                indice: action.payload.juntadaIndice,
                processoId: action.payload.processoId,
                componentesDigitaisIds: indexNode
            }));
            if (this.routerState.params['stepHandle']) {
                const steps = this.routerState.params['stepHandle'].split('-');
                if (parseInt(steps[0], 10) === action.payload.juntadaIndice) {
                    const componenteDigitalId = indexNode[steps[1]];
                    if (componenteDigitalId) {
                        const componenteDigital = componentesDigitaisJuntada.find(componente => componente.id === componenteDigitalId);
                        if (componenteDigital && componenteDigital.vinculacao !== 0) {
                            // Deve redirecionar, pois é um componente digital da juntada, e de vinculação, e já está no inedx
                            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                step: steps[0],
                                subStep: steps[1]
                            }));
                        }
                    }
                }
            }
            if (pagination.total > vinculacoes.length && !paginadoresJuntada.loading) {
                const nparams = {
                    juntadaId: action.payload.juntadaId,
                    documentoId: action.payload.documentoId,
                    juntadaIndice: action.payload.juntadaIndice,
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
     * @type {Observable<ProcessoViewActions.ProcessoViewActionsAll>}
     */
    downloadLatestBinary: Observable<ProcessoViewActions.ProcessoViewActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ProcessoViewActions.DownloadLatestBinary>(ProcessoViewActions.DOWNLOAD_LATEST_BINARY),
        switchMap(action => this._componenteDigitalService.downloadLatestByProcessoId(action.payload, '{}').pipe(
            tap((componenteDigital) => {
                if (componenteDigital?.mimetype != 'text/html') {
                    this._cacheComponenteDigitalModelService.set(componenteDigital, action.payload).subscribe();
                }
            }),
            map((response: any) => new ProcessoViewActions.SetCurrentStepSuccess({
                binary: response
            })),
            catchError(err => of(new ProcessoViewActions.SetCurrentStepFailed(err.error.message)))
        ))
    ));
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
                    console.log(componenteDigital);
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
}

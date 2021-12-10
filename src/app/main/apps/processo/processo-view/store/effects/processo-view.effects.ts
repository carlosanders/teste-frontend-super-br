import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoViewActions from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';

import {AddChildData, AddData} from '@cdk/ngrx-normalizr';
import {Juntada, VinculacaoEtiqueta} from '@cdk/models';
import {
    documento as documentoSchema,
    juntada as juntadaSchema,
    vinculacaoEtiqueta as vinculacaoEtiquetaSchema
} from '@cdk/normalizr';
import {JuntadaService} from '@cdk/services/juntada.service';
import {getCurrentStep, getIndex, getJuntadas, getPagination} from '../selectors';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromStore from '../index';
import {
    GetJuntadasEtiquetas,
    GetJuntadasEtiquetasSuccess
} from 'app/main/apps/processo/processo-view/store/actions/processo-view.actions';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

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
                JSON.stringify(chaveAcesso)
            ).pipe(
                tap((response) => {
                    this.index = juntadas.map(
                        (juntada) => {
                            if (!juntada.ativo) {
                                return [];
                            }
                            let componentesDigitaisIds = [];
                            if (juntada.documento.componentesDigitais) {
                                componentesDigitaisIds = juntada.documento.componentesDigitais.map(
                                    cd => cd.id
                                );
                            }
                            if (juntada.documento.vinculacoesDocumentos) {
                                juntada.documento.vinculacoesDocumentos.map(
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
                    new ProcessoViewActions.GetJuntadasEtiquetas(response.documento.id),
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
                'app/main/apps/processo/processo-view#juntadas');
        }),
        concatMap(response => [
            new AddData<Juntada>({data: response['entities'], schema: juntadaSchema}),
            new ProcessoViewActions.GetJuntadasSuccess({
                index: response['entities'].map(
                    (juntada) => {
                        if (!juntada.ativo) {
                            return [];
                        }
                        let componentesDigitaisIds = [];
                        if (juntada.documento.componentesDigitais) {
                            componentesDigitaisIds = juntada.documento.componentesDigitais.map(
                                cd => cd.id
                            );
                        }
                        if (juntada.documento.vinculacoesDocumentos) {
                            juntada.documento.vinculacoesDocumentos.map(
                                (vinculacaoDocumento) => {
                                    vinculacaoDocumento.documentoVinculado.componentesDigitais.map(
                                        cd => componentesDigitaisIds.push(cd.id)
                                    );
                                }
                            );
                        }
                        return componentesDigitaisIds;
                    }
                ),
                entitiesId: response['entities'].map(juntada => juntada.id),
                documentosId: response['entities'].map(juntada => juntada.documento.id),
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
            return of(new ProcessoViewActions.GetJuntadasFailed(err));
        })
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

            const routeParams = this.routerState.params['processoCopiaHandle'] ? of('processoCopiaHandle') : of('processoHandle');
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
                    'documento.vinculacoesDocumentos.documentoVinculado.juntadaAtual',
                    'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                    'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais',
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
        withLatestFrom(this._store.pipe(select(getIndex)), this._store.pipe(select(getCurrentStep)), this._store.pipe(select(getJuntadas))),
        switchMap(([, index, currentStep, juntadas]) => {
            if (this.routerState.params.stepHandle !== 'capa' && index[currentStep.step] === undefined) {
                // não tem documentos, vamos para capa
                this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                return of(null);
            } else if (index[currentStep.step][currentStep.subStep] === undefined) {
                // temos documento sem componente digital
                return of(null);
            } else {
                const juntada = juntadas[currentStep.step];
                if (juntada.documento.acessoNegado) {
                    // temos documento com acesso negado
                    return of(null);
                }
                // temos componente digital, vamos pega-lo
                const chaveAcesso = this.routerState.params.chaveAcessoHandle ?
                    {chaveAcesso: this.routerState.params.chaveAcessoHandle} : {};
                const context = JSON.stringify(chaveAcesso);

                return this._componenteDigitalService.download(index[currentStep.step][currentStep.subStep], context);
            }
        }),
        map((response: any) => new ProcessoViewActions.SetCurrentStepSuccess({
            binary: response,
            loaded: this.routerState.params.stepHandle
        })),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoViewActions.SetCurrentStepFailed(err));
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
            action.payload.documentosId.forEach((documentoId) => {
                this._store.dispatch(new GetJuntadasEtiquetas(documentoId));
            });

            if (this.routerState.params['stepHandle'] === 'default') {
                let capa = true;
                let firstJuntada = 0;
                if (action.payload.index) {
                    firstJuntada = action.payload.index.findIndex(indice => indice.length > 0);
                    capa = firstJuntada === -1;
                }
                if (capa) {
                    if (this.routerState.url.indexOf('/documento/') !== -1) {
                        const arrPrimary = [];
                        arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                            'visualizar-processo' : 'anexar-copia');
                        arrPrimary.push(this.routerState.params.processoHandle);
                        if (this.routerState.params.chaveAcessoHandle) {
                            arrPrimary.push('chave');
                            arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                        }
                        arrPrimary.push('visualizar');
                        arrPrimary.push('capa');
                        arrPrimary.push('mostrar');
                        const extras = {
                            relativeTo: this._activatedRoute.parent,
                            queryParams: {
                                documentoEdit: this.routerState.queryParams.documentoEdit
                            }
                        };

                        // Navegação do processo deve ocorrer por outlet
                        this._router.navigate(
                            [
                                this.routerState.url.split('/documento/')[0] + '/documento/' +
                                this.routerState.params.documentoHandle + '/',
                                {
                                    outlets: {
                                        primary: arrPrimary
                                    }
                                }
                            ],
                            extras
                        ).then();
                    } else {
                        let url = this.routerState.url.split('/processo/' +
                                this.routerState.params.processoHandle)[0] + '/processo/' +
                            this.routerState.params.processoHandle;
                        if (this.routerState.params.chaveAcessoHandle) {
                            url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                        }
                        url += '/visualizar/capa/mostrar';
                        const extras = {
                            queryParams: {
                                documentoEdit: this.routerState.queryParams.documentoEdit
                            }
                        };
                        this._router.navigate([url], extras).then();
                    }
                } else {
                    if (this.routerState.url.indexOf('/documento/') !== -1) {
                        if (this.routerState.url.indexOf('sidebar:') === -1) {
                            let sidebar = '';
                            const arrPrimary = [];
                            if (this.routerState.url.indexOf('anexar-copia') !== -1) {
                                arrPrimary.push('anexar-copia');
                                arrPrimary.push(this.routerState.params.processoHandle);
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
                                sidebar = 'editar/dados-basicos';
                            }
                            // Navegação do processo deve ocorrer por outlet
                            this._router.navigate(
                                [
                                    this.routerState.url.split('/documento/')[0] + '/documento/' +
                                    this.routerState.params.documentoHandle + '/',
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
                            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                step: firstJuntada,
                                subStep: 0
                            }));
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
                                documentoEdit: this.routerState.queryParams.documentoEdit,
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
                }
            } else if (pagination.offset === 0 && this.routerState.params['stepHandle'] &&
                this.routerState.params['stepHandle'] !== 'capa' && this.routerState.params['stepHandle'] !== 'default') {
                if (this.routerState.url.indexOf('/documento/') !== -1) {
                    if (this.routerState.url.indexOf('sidebar:') === -1) {
                        let sidebar = '';
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
                            sidebar = 'editar/dados-basicos';
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
                            const steps = this.routerState.params['stepHandle'].split('-');
                            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                step: steps[0],
                                subStep: steps[1]
                            }));
                        });
                    } else {
                        const steps = this.routerState.params['stepHandle'].split('-');
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
                            documentoEdit: this.routerState.queryParams.documentoEdit,
                            novaAba: this.routerState.queryParams.novaAba
                        }
                    };
                    this._router.navigate([url], extras)
                        .then(() => {
                            const steps = this.routerState.params['stepHandle'].split('-');
                            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                step: steps[0],
                                subStep: steps[1]
                            }));
                        });
                }
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

    constructor(
        private _actions: Actions,
        private _juntadaService: JuntadaService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _store: Store<State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

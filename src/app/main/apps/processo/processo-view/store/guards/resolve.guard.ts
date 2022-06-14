import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ProcessoViewAppState} from 'app/main/apps/processo/processo-view/store/reducers';
import * as fromStore from 'app/main/apps/processo/processo-view/store';
import {
    getIsLoading,
    getIsLoadingVolumes,
    getVolumesLoaded
} from 'app/main/apps/processo/processo-view/store';
import {getJuntadasLoaded} from 'app/main/apps/processo/processo-view/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {getProcesso, getProcessoLoaded} from '../../../store';
import {Processo} from '../../../../../../../@cdk/models';
import * as ProcessoViewActions from '../actions/processo-view.actions';
import {ProcessoViewService} from '../../processo-view.service';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    loadingJuntadas: boolean = false;
    loadingVolumes: boolean = false;
    error = null;
    processo: Processo;
    downloadingBinary: boolean = false;
    loadingProcesso = null;
    filtered = null;
    guardaAtivado: boolean;

    /**
     *
     * @param _store
     * @param _router
     * @param _activatedRoute
     * @param _processoViewService
     */
    constructor(
        private _store: Store<ProcessoViewAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _processoViewService: ProcessoViewService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store.pipe(
            select(getIsLoading)
        ).subscribe((loading) => {
            this.loadingJuntadas = loading;
        });

        this._store.pipe(
            select(getIsLoadingVolumes)
        ).subscribe((loading) => {
            this.loadingVolumes = loading;
        });

        this._store.pipe(
            select(getProcesso)
        ).subscribe((processo) => {
            this.processo = processo;
        });

        this._processoViewService.guardaAtivado.subscribe((value) => {
            this.guardaAtivado = value;
            if (!value) {
                this.downloadingBinary = false;
            }
        });

        this.downloadingBinary = false;
        this.filtered = null;
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin([
            this.getStep(),
            this.getJuntadas(),
            this.getVolumes()
        ]).pipe(
            take(1)
        );
    }

    getStep(): Observable<any> {
        if (this.routerState.url.includes('capa/mostrar')) {
            this.loadingProcesso = parseInt(this.routerState.params['processoHandle'], 10);
            return of(true);
        } else {
            return this._store.pipe(
                select(getProcessoLoaded),
                tap((loaded: any) => {
                    if (!this.downloadingBinary && !this.guardaAtivado && this.routerState.params[loaded.id] === loaded.value) {
                        this._processoViewService.guardaAtivado.next(true);
                        let stepHandle = this.routerState.params['stepHandle'];
                        const index = loaded?.juntadaIndex;
                        const currentStep = {};
                        if (stepHandle === 'default') {
                            this.filtered = null;
                            if (index && index['juntadaId']) {
                                currentStep['step'] = index['juntadaId'];
                                currentStep['subStep'] = null;
                                stepHandle = currentStep['step']
                                if (index['componenteDigitalId']) {
                                    currentStep['subStep'] = index['componenteDigitalId'];
                                    stepHandle += '-' + currentStep['subStep'];
                                }
                                this.downloadingBinary = true;
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
                                    if (this.routerState.url.indexOf('sidebar:') === -1 || sidebar !== null) {
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
                                                step: currentStep['step'],
                                                subStep: currentStep['subStep']
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
                                                step: currentStep['step'],
                                                subStep: currentStep['subStep']
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
                                    url += '/visualizar/' + stepHandle;
                                    const extras = {
                                        queryParams: {
                                            novaAba: this.routerState.queryParams.novaAba
                                        }
                                    };
                                    this._router.navigate([url], extras)
                                        .then(() => {
                                            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                                step: currentStep['step'],
                                                subStep: currentStep['subStep']
                                            }));
                                        });
                                }
                            } else {
                                this.downloadingBinary = true;
                                this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                            }
                        } else {
                            // temos componente digital, vamos pega-lo
                            const stepHandleArr = stepHandle.split('-');
                            currentStep['step'] = parseInt(stepHandleArr[0], 10);
                            currentStep['subStep'] = stepHandleArr[1] ? parseInt(stepHandleArr[1], 10) : null;
                            this.downloadingBinary = true;
                            this.filtered = currentStep['step'];

                            this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                                step: currentStep['step'],
                                subStep: currentStep['subStep']
                            }));
                        }
                    }
                }),
                filter((loaded: any) => this.downloadingBinary || this.routerState.params[loaded.id] === loaded.value),
                take(1)
            );
        }
    }

    /**
     * Get Juntadas
     *
     * @returns
     */
    getJuntadas(): any {
        return this._store.pipe(
            select(getJuntadasLoaded),
            tap((loaded: any) => {
                if (!this.loadingJuntadas && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    this._store.dispatch(new fromStore.UnloadJuntadas({}));

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

                    if (this.filtered !== null) {
                        // Juntada deve ser filtrada, para garantir que a juntada pesquisada originalmente pela url apareça para o usuário
                        params.listFilter['id'] = 'eq:' + this.filtered;
                    }

                    this._store.dispatch(new fromStore.GetJuntadas(params));
                    this.loadingJuntadas = true;
                }
            }),
            filter((loaded: any) => !this.loadingJuntadas && (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }

    /**
     * Get Volumes
     *
     * @returns
     */
    getVolumes(): any {
        return this._store.pipe(
            select(getVolumesLoaded),
            tap((loaded: any) => {
                if (!this.loadingVolumes && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    this._store.dispatch(new fromStore.UnloadVolumes({reset: true}));

                    let processoFilter = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoFilter = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'processo.id': processoFilter
                        },
                        listFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {numeracaoSequencial: 'ASC'},
                        populate: []
                    };

                    this._store.dispatch(new fromStore.GetVolumes(params));
                    this.loadingVolumes = true;
                }
            }),
            filter((loaded: any) => !this.loadingVolumes && (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }
}

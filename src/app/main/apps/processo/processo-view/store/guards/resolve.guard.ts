import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ProcessoViewAppState} from 'app/main/apps/processo/processo-view/store/reducers';
import * as fromStore from 'app/main/apps/processo/processo-view/store';
import {
    getBinary,
    getIsLoading,
    getIsLoadingVolumes,
    getVolumesLoaded
} from 'app/main/apps/processo/processo-view/store';
import {getJuntadasLoaded} from 'app/main/apps/processo/processo-view/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {getProcesso} from '../../../store';
import {Processo} from '../../../../../../../@cdk/models';
import * as ProcessoViewActions from '../actions/processo-view.actions';
import {ProcessoViewService} from '../../processo-view.service';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    loadingLatestBinary: boolean = false;
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
            select(getBinary)
        ).subscribe((binary) => {
            if (this.loadingProcesso === null || binary.processo !== this.loadingProcesso || !!binary.error) {
                this.loadingLatestBinary = binary.loading;
                this.loadingProcesso = binary.processo;
                this.error = binary.error;
            }
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
                this.loadingLatestBinary = false;
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
            this.downloadLatestBinary(),
            this.getJuntadas(),
            this.getVolumes()
        ]).pipe(
            take(1)
        );
    }

    downloadLatestBinary(): any {
        if (this.routerState.url.includes('capa/mostrar')) {
            this.loadingLatestBinary = false;
            this.loadingProcesso = parseInt(this.routerState.params['processoHandle'], 10);
            return of(true);
        } else if (this.routerState.url.includes('/latest')) {
            return this._store.pipe(
                select(getBinary),
                tap((binary: any) => {
                    let processoId = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoId = parseInt(this.routerState.params[param], 10);
                    });
                    if (!this.loadingLatestBinary && ((!binary.src) || this.loadingProcesso !== processoId)) {
                        this._store.dispatch(new fromStore.DownloadLatestBinary(processoId));
                        this.loadingLatestBinary = true;
                    }
                }),
                filter((binary: any) => this.loadingLatestBinary || (!!binary.src) ||
                    (binary.processo === parseInt(this.routerState.params['processoHandle'], 10)) ||
                    (this.loadingProcesso === parseInt(this.routerState.params['processoHandle'], 10))),
                take(1)
            );
        } else {
            this.loadingLatestBinary = false;
            this.loadingProcesso = parseInt(this.routerState.params['processoHandle'], 10);
            if (this.routerState.params['stepHandle'] && !this.routerState.params['stepHandle'].includes('capa')) {
                const stepHandle = this.routerState.params['stepHandle'].split('-');
                this._store.dispatch(new ProcessoViewActions.SetCurrentStep({
                    step: parseInt(stepHandle[0], 10),
                    subStep: !isNaN(parseInt(stepHandle[1], 10)) ? parseInt(stepHandle[1], 10) : null
                }));
                return of(true);
            }
            this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
            return of(true);
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
                            'documento.vinculacoesEtiquetas.etiqueta',
                            'origemDados'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetJuntadas(params));
                    this.loadingJuntadas = true;
                }
            }),
            filter((loaded: any) => this.loadingJuntadas || (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
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
            filter((loaded: any) => this.loadingVolumes || (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }
}

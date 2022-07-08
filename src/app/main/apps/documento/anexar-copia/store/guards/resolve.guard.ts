import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {AnexarCopiaAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {Processo} from '@cdk/models';
import {AnexarCopiaService} from '../../anexar-copia.service';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    processoId: number;
    loadingLatestBinary: boolean = false;
    loadingJuntadas: boolean = false;
    loadingVolumes: boolean = false;
    error = null;
    processo: Processo;
    downloadingBinary: boolean = false;
    loadingProcesso = null;
    guardaAtivado: boolean;

    /**
     *
     * @param _store
     * @param _router
     * @param _anexarCopiaService
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<AnexarCopiaAppState>,
        private _router: Router,
        private _anexarCopiaService: AnexarCopiaService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store.pipe(
            select(fromStore.getIsLoading)
        ).subscribe((loading) => {
            this.loadingJuntadas = loading;
        });

        this._store.pipe(
            select(fromStore.getIsLoadingVolumes)
        ).subscribe((loading) => {
            this.loadingVolumes = loading;
        });

        this._store.pipe(
            select(fromStore.getBinary)
        ).subscribe((binary) => {
            if (this.loadingProcesso === null || binary.processo !== this.loadingProcesso || !!binary.error) {
                this.loadingProcesso = binary.processo;
                this.error = binary.error;
            }
        });

        this._store.pipe(
            select(fromStore.getIsLoadingLatestBinary)
        ).subscribe((loading) => {
            this.loadingLatestBinary = loading;
        })

        this._store.pipe(
            select(fromStore.getProcesso)
        ).subscribe((processo) => {
            this.processo = processo;
        });

        this._anexarCopiaService.guardaAtivado.subscribe((value) => {
            this.guardaAtivado = value;
            if (!value) {
                this.downloadingBinary = false;
            }
        });

        this.downloadingBinary = false;
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
            this.getProcesso(),
            this.downloadLatestBinary(),
            this.getJuntadas(),
            this.getVolumes()
        ]).pipe(
            take(1)
        );
    }

    /**
     * Get Processo
     *
     * @returns
     */
    getProcesso(): any {
        return this._store.pipe(
            select(fromStore.getProcessoLoaded),
            tap((loaded: any) => {
                if (loaded.acessoNegado) {
                    const sidebar = 'empty';
                    const arrPrimary = [];
                    let url = this.routerState.url.split('/documento')[0] + '/documento/' + this.routerState.params.documentoHandle + '/';
                    arrPrimary.push('anexar-copia');
                    arrPrimary.push(this.routerState.params.processoCopiaHandle);
                    arrPrimary.push('acesso-negado');
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
                    ).then(() => {});
                } else {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        this._store.dispatch(new fromStore.GetProcesso({id: this.routerState.params['processoCopiaHandle']}));
                    }
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    downloadLatestBinary(): any {
        return this._store.pipe(
            select(fromStore.getBinary),
            tap((binary: any) => {
                let processoId = null;

                const routeParams = of('processoCopiaHandle');
                routeParams.subscribe((param) => {
                    processoId = parseInt(this.routerState.params[param], 10);
                });
                if (!this.loadingLatestBinary && (!binary.src) && this.loadingProcesso !== processoId) {
                    this._store.dispatch(new fromStore.DownloadLatestBinary(processoId));
                    this.loadingLatestBinary = true;
                }
            }),
            filter((binary: any) => !this.loadingLatestBinary && ((!!binary.src) ||
                (binary.processo === parseInt(this.routerState.params['processoCopiaHandle'], 10)) ||
                (this.loadingProcesso === parseInt(this.routerState.params['processoCopiaHandle'], 10)))),
            take(1)
        );
    }

    /**
     * Get Juntadas
     *
     * @returns
     */
    getJuntadas(): any {
        return this._store.pipe(
            select(fromStore.getJuntadasLoaded),
            tap((loaded: any) => {
                if (!this.loadingJuntadas && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    this._store.dispatch(new fromStore.UnloadJuntadas({}));

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
            select(fromStore.getVolumesLoaded),
            tap((loaded: any) => {
                if (!this.loadingVolumes && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    this._store.dispatch(new fromStore.UnloadVolumes({reset: true}));

                    let processoFilter = null;

                    const routeParams = of('processoCopiaHandle');
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



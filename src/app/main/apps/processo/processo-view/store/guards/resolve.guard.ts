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

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    loadingJuntadas: boolean = false;
    loadingVolumes: boolean = false;
    loadingLatestBinary: boolean = false;
    loadingProcesso = null;
    error = null;

    /**
     * Constructor
     *
     * @param _store
     * @param _router
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<ProcessoViewAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store
            .pipe(select(getIsLoading))
            .subscribe((loading) => {
                this.loadingJuntadas = loading;
            });

        this._store
            .pipe(select(getIsLoadingVolumes))
            .subscribe((loading) => {
                this.loadingVolumes = loading;
            });

        this._store
            .pipe(select(getBinary))
            .subscribe((binary) => {
                if (this.loadingProcesso === null || binary.processo !== this.loadingProcesso || !!binary.error) {
                    this.loadingLatestBinary = binary.loading;
                    this.loadingProcesso = binary.processo;
                    this.error = binary.error;
                }
            });
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
        return forkJoin([this.downloadLatestBinary(), this.getJuntadas(), this.getVolumes()]).pipe(
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
            select(getJuntadasLoaded),
            tap((loaded: any) => {
                if (!this.loadingJuntadas && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    this._store.dispatch(new fromStore.UnloadJuntadas({}));

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

                    const routeParams = this.routerState.params['processoCopiaHandle'] ? of('processoCopiaHandle') : of('processoHandle');
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

    downloadLatestBinary(): any {
        if (this.routerState.url.includes('capa/mostrar')) {
            this.loadingLatestBinary = false;
            this.loadingProcesso = parseInt(this.routerState.params['processoCopiaHandle'] ?? this.routerState.params['processoHandle'], 10);
            return of(true);
        } else {
            return this._store.pipe(
                select(getBinary),
                tap((binary: any) => {
                    let processoId = null;

                    const routeParams = this.routerState.params['processoCopiaHandle'] ? of('processoCopiaHandle') : of('processoHandle');
                    routeParams.subscribe((param) => {
                        processoId = parseInt(this.routerState.params[param], 10);
                    });
                    if (!this.loadingLatestBinary && (!binary.src) && this.loadingProcesso !== processoId) {
                        this._store.dispatch(new fromStore.DownloadLatestBinary(processoId));
                        this.loadingLatestBinary = true;
                    }
                }),
                filter((binary: any) => this.loadingLatestBinary || (!!binary.src) ||
                    (binary.processo === parseInt(this.routerState.params['processoCopiaHandle'] ?? this.routerState.params['processoHandle'], 10)) ||
                    (this.loadingProcesso === parseInt(this.routerState.params['processoCopiaHandle'] ?? this.routerState.params['processoHandle'], 10))),
                take(1)
            );
        }
    }
}

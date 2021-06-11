import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ProcessoViewAppState} from 'app/main/apps/processo/processo-view/store/reducers';
import * as fromStore from 'app/main/apps/processo/processo-view/store';
import {
    getDocumentosHasLoaded,
    getIsLoading,
    getIsLoadingVolumes,
    getMinutasLoading,
    getVolumesLoaded
} from 'app/main/apps/processo/processo-view/store';
import {getJuntadasLoaded} from 'app/main/apps/processo/processo-view/store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    loadingJuntadas: boolean = false;

    loadingDocumentos: boolean = false;

    loadingVolumes: boolean = false;

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
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store
            .pipe(select(getIsLoading))
            .subscribe((loading) => {
                this.loadingJuntadas = loading;
            });


        this._store
            .pipe(select(getMinutasLoading))
            .subscribe((loading) => {
                this.loadingDocumentos = loading;
            });

        this._store
            .pipe(select(getIsLoadingVolumes))
            .subscribe((loading) => {
                this.loadingVolumes = loading;
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
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin([this.getJuntadas(), this.getDocumentos(), this.getVolumes()]).pipe(
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
                    this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));

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
                            'documento.juntadaAtual',
                            'documento.tipoDocumento',
                            'documento.componentesDigitais',
                            'documento.vinculacoesDocumentos',
                            'documento.vinculacoesDocumentos.documentoVinculado',
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
            filter((loaded: any) => this.loadingJuntadas || (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    getDocumentos(): any {
        if (this.routerState.params['tarefaHandle']) {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (!this.loadingDocumentos && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                        this._store.dispatch(new fromStore.GetDocumentos());
                        this.loadingDocumentos = true;
                    }
                }),
                filter((loaded: any) => this.loadingDocumentos || (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadDocumentos());
                        this.loadingDocumentos = false;
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
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
}

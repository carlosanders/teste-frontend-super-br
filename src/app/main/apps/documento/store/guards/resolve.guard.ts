import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoAppState} from '../reducers';
import * as fromStore from '../';
import {getDocumentoLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {getDocumentosVinculadosHasLoaded, getJuntadaLoaded} from '../';
import {getVisibilidadeListLoaded} from '../';
import {getSigilosLoaded} from '../';
@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<DocumentoAppState>} _store
     */
    constructor(
        private _store: Store<DocumentoAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return forkJoin(
            this.getDocumento(),
            this.getDocumentosVinculados(),
            this.getVisibilidades(),
            this.getSigilos(),
            this.getJuntada()
        ).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Documento
     *
     * @returns {Observable<any>}
     */
    getDocumento(): any {
        return this._store.pipe(
            select(getDocumentoLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetDocumento());
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get Documentos Vinculados
     *
     * @returns {Observable<any>}
     */
    getDocumentosVinculados(): any {
        return this._store.pipe(
            select(getDocumentosVinculadosHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetDocumentosVinculados());
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get Visibilidades
     *
     * @returns {Observable<any>}
     */
    getVisibilidades(): any {
        return this._store.pipe(
            select(getVisibilidadeListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let documentoId = null;

                    const routeParams = of('documentoHandle');
                    routeParams.subscribe(param => {
                        documentoId = this.routerState.params[param];
                    });

                    this._store.dispatch(new fromStore.GetVisibilidades(documentoId));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get Sigilos
     *
     * @returns {Observable<any>}
     */
    getSigilos(): any {
        return this._store.pipe(
            select(getSigilosLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let documentoId = null;

                    const routeParams = of('documentoHandle');
                    routeParams.subscribe(param => {
                        documentoId = this.routerState.params[param];
                    });

                    this._store.dispatch(new fromStore.GetSigilos(documentoId));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get Juntada
     *
     * @returns {Observable<any>}
     */
    getJuntada(): any {
        return this._store.pipe(
            select(getJuntadaLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    let documentoId = null;

                    const routeParams = of('documentoHandle');
                    routeParams.subscribe(param => {
                        documentoId = this.routerState.params[param];
                    });

                    this._store.dispatch(new fromStore.GetJuntada(documentoId));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

}

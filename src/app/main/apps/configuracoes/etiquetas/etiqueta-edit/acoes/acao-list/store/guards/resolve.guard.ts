import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {AcaoListAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {getAcaoListLoaded, getEtiquetaLoaded} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<AcaoListAppState>} _store
     */
    constructor(
        private _store: Store<AcaoListAppState>
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
        return forkJoin([
            this.getAcoes(),
            this.getEtiqueta(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Acoes
     *
     * @returns {Observable<any>}
     */
    getAcoes(): any {
        return this._store.pipe(
            select(getAcaoListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let etiquetaId = null;

                    const routeParams = of('etiquetaHandle');
                    routeParams.subscribe(param => {
                        etiquetaId = this.routerState.params[param];
                    });

                    const params = {
                        filter: {
                            'etiqueta.id': 'eq:' + etiquetaId
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll',
                            'modalidadeAcaoEtiqueta',
                            'modalidadeEtiqueta'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetAcoes(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get Etiqueta
     *
     * @returns {Observable<any>}
     */
    getEtiqueta(): any {
        return this._store.pipe(
            select(getEtiquetaLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    const filter = {
                            'id': 'eq:' + this.routerState.params.etiquetaHandle
                    };

                    this._store.dispatch(new fromStore.GetEtiqueta(filter));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

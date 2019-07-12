import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src/router_state';
import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {EtiquetaAppState} from '../reducers';
import * as fromStore from '../';
import {getEtiquetaLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<EtiquetaAppState>,
        private _router: Router
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
        return this.getEtiqueta().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
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
                    if (this.routerState.params['etiquetaHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateEtiqueta());
                    } else {
                        this._store.dispatch(new fromStore.GetEtiqueta({
                            'id': 'eq:' + this.routerState.params['etiquetaHandle']
                        }));
                    }
                }

            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

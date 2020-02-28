import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, take, filter } from 'rxjs/operators';

import { OficioDetailAppState } from 'app/main/apps/oficios/oficio-detail/store/reducers';
import * as fromStore from 'app/main/apps/oficios/oficio-detail/store';
import { getHasLoaded } from 'app/main/apps/oficios/oficio-detail/store/selectors';
import { getRouterState } from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<OficioDetailAppState>} _store
     */
    constructor(
        private _store: Store<OficioDetailAppState>
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
        return this.getDocumentoAvulso().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Tarefa
     *
     * @returns {Observable<any>}
     */
    getDocumentoAvulso(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetDocumentoAvulso({
                        id: 'eq:' + this.routerState.params['documentoAvulsoHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

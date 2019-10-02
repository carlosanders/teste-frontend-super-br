import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {InteressadoEditAppState} from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store/reducers';
import * as fromStore from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store';
import {getHasLoaded} from 'app/main/apps/processo/processo-edit/interessados/interessado-edit/store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<InteressadoEditAppState>} _store
     */
    constructor(
        private _store: Store<InteressadoEditAppState>
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
        return this.getInteressado().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Interessado
     *
     * @returns {Observable<any>}
     */
    getInteressado(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['interessadoHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateInteressado());
                    } else {
                        this._store.dispatch(new fromStore.GetInteressado({
                            id: 'eq:' + this.routerState.params['interessadoHandle']
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

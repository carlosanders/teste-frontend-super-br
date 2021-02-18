import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {LoginAppState} from '../reducers';
import * as fromStore from '../';
import {getConfig} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<LoginAppState>} _store
     */
    constructor(
        private _store: Store<LoginAppState>
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
        return this.getConfig().pipe(
            switchMap(() => of(true)),
            catchError(() => of(true))
        );
    }

    /**
     * Get Config
     *
     * @returns {Observable<any>}
     */
    getConfig(): any {
        return this._store.pipe(
            select(getConfig),
            tap((config: any) => {
                if (!config || config.error) {
                    this._store.dispatch(new fromStore.GetConfig());
                }
            }),
            filter((config: any) => {
                return !!config;
            }),
            take(1)
        );
    }
}

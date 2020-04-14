import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {EspecieSetorAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoadedEspecieSetor} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _router
     * @param _store
     */
    constructor(
        private _router: Router,
        private _store: Store<EspecieSetorAppState>
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
        return this.getEspecieSetor().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get EspecieSetor
     *
     * @returns {Observable<any>}
     */
    getEspecieSetor(): any {
        return this._store.pipe(
            select(getHasLoadedEspecieSetor),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['modeloHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetEspecieSetor({
                        id: 'eq:' + this.routerState.params['modeloHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['modeloHandle'] && this.routerState.params['modeloHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

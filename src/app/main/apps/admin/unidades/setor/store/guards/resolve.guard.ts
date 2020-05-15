import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {SetorAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoadedUnidade} from '../selectors';
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
        private _store: Store<SetorAppState>
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
        return this.getUnidade().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Setor
     *
     * @returns {Observable<any>}
     */
    getUnidade(): any {
        return this._store.pipe(
            select(getHasLoadedUnidade),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['unidadeHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetUnidade({
                        id: 'eq:' + this.routerState.params['unidadeHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['unidadeHandle'] && this.routerState.params['unidadeHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

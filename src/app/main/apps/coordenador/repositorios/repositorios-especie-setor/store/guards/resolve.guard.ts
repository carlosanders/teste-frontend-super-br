import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {RepositoriosEspecieSetorAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoadedRepositorio} from '../selectors';
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
        private _store: Store<RepositoriosEspecieSetorAppState>
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
        return this.getRepositorio().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get Usuario
     *
     * @returns {Observable<any>}
     */
    getRepositorio(): any {
        return this._store.pipe(
            select(getHasLoadedRepositorio),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['repositorioHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetRepositorio({
                        id: 'eq:' + this.routerState.params['repositorioHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['repositorioHandle'] && this.routerState.params['repositorioHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

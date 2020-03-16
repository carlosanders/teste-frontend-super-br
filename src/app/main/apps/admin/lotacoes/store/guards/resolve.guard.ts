import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {LotacoesAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoadedSetor, getHasLoadedUsuario} from '../selectors';
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
        private _store: Store<LotacoesAppState>
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
        return this.getParametro().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    getParametro(): any {
        if (this.routerState.params['setorHandle']) {
            return this.getSetor();
        }
        if (this.routerState.params['usuarioHandle']) {
            return this.getUsuario();
        }
    }

    /**
     * Get Usuario
     *
     * @returns {Observable<any>}
     */
    getUsuario(): any {
        return this._store.pipe(
            select(getHasLoadedUsuario),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['usuarioHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetUsuario({
                        id: 'eq:' + this.routerState.params['usuarioHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['usuarioHandle'] && this.routerState.params['usuarioHandle'] === loaded.value;
            }),
            take(1)
        );
    }

    /**
     * Get Setor
     *
     * @returns {Observable<any>}
     */
    getSetor(): any {
        return this._store.pipe(
            select(getHasLoadedSetor),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['setorHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetSetor({
                        id: 'eq:' + this.routerState.params['setorHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['setorHandle'] && this.routerState.params['setorHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

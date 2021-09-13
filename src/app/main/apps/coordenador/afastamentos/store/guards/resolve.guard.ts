import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {AfastamentosAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoadedUsuario} from '../selectors';
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
        private _store: Store<AfastamentosAppState>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getUsuario().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Usuario
     *
     * @returns
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
            filter((loaded: any) => this.routerState.params['usuarioHandle'] && this.routerState.params['usuarioHandle'] === loaded.value),
            take(1)
        );
    }
}

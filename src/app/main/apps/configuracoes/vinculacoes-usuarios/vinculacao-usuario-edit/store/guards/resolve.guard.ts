import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src/router_state';
import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {VinculacaoUsuarioEditAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<VinculacaoUsuarioEditAppState>} _store
     */
    constructor(
        private _store: Store<VinculacaoUsuarioEditAppState>
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
        return this.getVinculacaoUsuario().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get VinculacaoUsuario
     *
     * @returns {Observable<any>}
     */
    getVinculacaoUsuario(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['vinculacaoUsuarioHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateVinculacaoUsuario());
                    } else {
                        this._store.dispatch(new fromStore.GetVinculacaoUsuario({
                            'id': 'eq:' + this.routerState.params['vinculacaoUsuarioHandle']
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

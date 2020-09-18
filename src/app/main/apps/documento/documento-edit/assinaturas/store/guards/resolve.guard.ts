import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoEditAssinaturasAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getAssinaturasLoaded, getAssinaturasPagination} from '../';
@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<DocumentoEditAssinaturasAppState>} _store
     */
    constructor(
        private _store: Store<DocumentoEditAssinaturasAppState>
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
        return this.getAssinaturas().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Repositorios
     *
     * @returns {Observable<any>}
     */
    getAssinaturas(): any {
        return this._store.pipe(
            select(getAssinaturasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    let assinaturasPagination: any = null;

                    this._store.pipe(select(getAssinaturasPagination)).subscribe(pagination => {
                        assinaturasPagination = pagination;
                    });
                    this._store.dispatch(new fromStore.GetAssinaturas(assinaturasPagination));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

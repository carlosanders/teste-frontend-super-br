import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoEditInteligenciaAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getRepositoriosLoaded, getRepositoriosPagination} from '../';
@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<DocumentoEditInteligenciaAppState>} _store
     */
    constructor(
        private _store: Store<DocumentoEditInteligenciaAppState>
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
        return forkJoin(
            this.getRepositorios(),
        ).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Repositorios
     *
     * @returns {Observable<any>}
     */
    getRepositorios(): any {
        return this._store.pipe(
            select(getRepositoriosLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    let repositoriosPagination: any = null;

                    this._store.pipe(select(getRepositoriosPagination)).subscribe(pagination => {
                        repositoriosPagination = pagination;
                    });
                    this._store.dispatch(new fromStore.GetRepositorios(repositoriosPagination));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}
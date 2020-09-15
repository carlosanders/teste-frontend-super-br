import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoAvulsoEditAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {GetDocumentosVinculados} from '../../anexos/store/actions';
import {getDocumentosVinculadosHasLoaded} from '../../anexos/store/selectors';
import {getRepositoriosLoaded, getRepositoriosPagination} from '../../inteligencia/store/selectors';
import {GetRepositorios} from '../../inteligencia/store/actions';


@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<DocumentoAvulsoEditAppState>} _store
     */
    constructor(
        private _store: Store<DocumentoAvulsoEditAppState>
    ) {
        console.log('ué');
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
            this.getResolvers(),
        ).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Resolvers
     *
     * @returns {Observable<any>}
     */
    getResolvers(): any {
        if (this.routerState.params.sidebarHandle === 'anexos') {
            return this._store.pipe(
                select(getDocumentosVinculadosHasLoaded),
                tap((loaded: any) => {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        this._store.dispatch(new GetDocumentosVinculados());
                    }
                }),
                filter((loaded: any) => {
                    return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
                }),
                take(1)
            );
        } else if (this.routerState.params.sidebarHandle === 'inteligencia') {
            return this._store.pipe(
                select(getRepositoriosLoaded),
                tap((loaded: any) => {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        let repositoriosPagination: any = null;

                        this._store.pipe(select(getRepositoriosPagination)).subscribe(pagination => {
                            repositoriosPagination = pagination;
                        });
                        this._store.dispatch(new GetRepositorios(repositoriosPagination));
                    }
                }),
                filter((loaded: any) => {
                    return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
                }),
                take(1)
            );
        } else {
            return of(true);
        }
    }
}

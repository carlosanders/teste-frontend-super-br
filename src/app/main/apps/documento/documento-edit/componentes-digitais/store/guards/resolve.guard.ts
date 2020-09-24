import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoEditComponentesDigitaisAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getComponenteDigitalLoaded, getComponenteDigitalPagination} from '../';
@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<DocumentoEditComponentesDigitaisAppState>} _store
     */
    constructor(
        private _store: Store<DocumentoEditComponentesDigitaisAppState>
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
        return this.getComponentesDigitais().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Componentes Digitais
     *
     * @returns {Observable<any>}
     */
    getComponentesDigitais(): any {
        return this._store.pipe(
            select(getComponenteDigitalLoaded),
            tap((loaded: any) => {
                if (!loaded || !this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    const params = {
                        filter: {
                            'documento.id': 'eq:' + this.routerState.params.documentoHandle
                        }
                    };
                    this._store.dispatch(new fromStore.GetComponentesDigitais(params));
                }
            }),
            filter((loaded: any) => {
                return loaded && this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

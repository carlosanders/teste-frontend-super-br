import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src/router_state';
import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoAvulsoCreateAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<ModelosAppState>} _store
     */
    constructor(
        private _store: Store<DocumentoAvulsoCreateAppState>
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
        return this.getHandle().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Handle
     *
     * @returns {Observable<any>}
     */
    getHandle(): any {

        return this._store.pipe(
            select(fromStore.getLoaded),
            tap((loaded: any) => {

                const routeParams1 = of('tarefaHandle');
                routeParams1.subscribe(param => {
                    if (this.routerState.params[param]) {
                        this._store.dispatch(new fromStore.CreateDocumentoAvulso({
                            id: 'tarefaHandle',
                            value: this.routerState.params[param]
                        }));
                    }
                });

                const routeParams2 = of('processoHandle');
                routeParams2.subscribe(param => {
                    if (this.routerState.params[param]) {
                        this._store.dispatch(new fromStore.CreateDocumentoAvulso({
                            id: 'processoHandle',
                            value: this.routerState.params[param]
                        }));
                    }
                });
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

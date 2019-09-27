import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {InteressadoListAppState} from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/reducers';
import * as fromStore from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store';
import {getRouterState} from 'app/store/reducers';
import {getInteressadoListLoaded} from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<InteressadoListAppState>} _store
     */
    constructor(
        private _store: Store<InteressadoListAppState>
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
        return this.getInteressados().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Interessados
     *
     * @returns {Observable<any>}
     */
    getInteressados(): any {
        return this._store.pipe(
            select(getInteressadoListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let processoId = null;

                    const routeParams = of('processoHandle');
                    routeParams.subscribe(param => {
                        processoId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'processo.id': processoId
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {principal: 'DESC', criadoEm: 'DESC'},
                        populate: [
                            'populateAll'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetInteressados(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

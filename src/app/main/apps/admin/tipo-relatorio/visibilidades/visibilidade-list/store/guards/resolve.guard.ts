import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {VisibilidadeListAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {getVisibilidadeListLoaded} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<VisibilidadeListAppState>
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
        return this.getVisibilidades().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Visibilidades
     *
     * @returns
     */
    getVisibilidades(): any {
        return this._store.pipe(
            select(getVisibilidadeListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let tipoRelatorioId = null;

                    const routeParams = of('tipoRelatorioHandle');
                    routeParams.subscribe((param) => {
                        tipoRelatorioId = this.routerState.params[param];
                    });

                    this._store.dispatch(new fromStore.GetVisibilidades(tipoRelatorioId));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

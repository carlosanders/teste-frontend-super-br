import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ModelosEspecieSetorAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoadedModelo} from '../selectors';
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
        private _store: Store<ModelosEspecieSetorAppState>
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
        return this.getModelo().pipe(
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
    getModelo(): any {
        return this._store.pipe(
            select(getHasLoadedModelo),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['modeloHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetModelo({
                        id: this.routerState.params['modeloHandle']
                    }));
                }
            }),
            filter((loaded: any) => this.routerState.params['modeloHandle'] && this.routerState.params['modeloHandle'] === loaded.value),
            take(1)
        );
    }
}

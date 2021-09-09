import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {RootLocalizadoresAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getHasLoadedSetor} from '../selectors';

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
        private _store: Store<RootLocalizadoresAppState>
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
        return this.getSetor().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Setor
     *
     * @returns
     */
    getSetor(): any {
        return this._store.pipe(
            select(getHasLoadedSetor),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['setorHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetSetor({
                        id: this.routerState.params['setorHandle']
                    }));
                }
            }),
            filter((loaded: any) => this.routerState.params['setorHandle'] && this.routerState.params['setorHandle'] === loaded.value),
            take(1)
        );
    }
}

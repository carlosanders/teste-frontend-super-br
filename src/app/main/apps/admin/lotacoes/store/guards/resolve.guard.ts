import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {RootLotacoesAppState} from '../reducers';
import * as fromStore from '../index';
import {getHasLoadedSetor, getHasLoadedUsuario} from '../selectors';
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
        private _store: Store<RootLotacoesAppState>
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
        return this.getParametro().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    getParametro(): any {
        return forkJoin(
            this.getUsuario()
        ).pipe(
            take(1),
            switchMap(() =>
                this.getSetor()
            )
        );
    }

    /**
     * Get Usuario
     *
     * @returns
     */
    getUsuario(): any {
        if (this.routerState.params['usuarioHandle']) {
            return this._store.pipe(
                select(getHasLoadedUsuario),
                tap((loaded: any) => {
                    if (!loaded || this.routerState.params['usuarioHandle'] !== loaded.value) {
                        this._store.dispatch(new fromStore.GetUsuario({
                            id: this.routerState.params['usuarioHandle']
                        }));
                    }
                }),
                filter((loaded: any) => this.routerState.params['usuarioHandle'] && this.routerState.params['usuarioHandle'] === loaded.value),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getHasLoadedUsuario),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadUsuario());
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }

    /**
     * Get Setor
     *
     * @returns
     */
    getSetor(): any {
        if (this.routerState.params['setorHandle']) {
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
        } else {
            return this._store.pipe(
                select(getHasLoadedSetor),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadSetor());
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }
}

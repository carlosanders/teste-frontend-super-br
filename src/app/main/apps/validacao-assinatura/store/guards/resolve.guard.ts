import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ValidacaoAssinaturaAppState, ComponenteDigitalState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getComponenteDigitalLoaded} from "../";

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;

    /**
     *
     * @param _store
     * @param _router
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<ValidacaoAssinaturaAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
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
        return this.getComponenteDigital().pipe(
            switchMap(() => of(true)),
            catchError(() => {
                return of(false);
            })
        );
    }

    /**
     * Get ComponenteDigital
     *
     * @returns
     */
    getComponenteDigital(): any {
        return this._store.pipe(
            select(fromStore.getComponenteDigitalLoaded),
            tap((loaded) => {
                if (!loaded || loaded.id !== this.routerState.params['componenteDigitalHandle'] || loaded.chaveAcesso !== this.routerState.params['chaveAcessoHandler']) {
                    this._store.dispatch(new fromStore.DownloadComponenteDigital());
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }
}

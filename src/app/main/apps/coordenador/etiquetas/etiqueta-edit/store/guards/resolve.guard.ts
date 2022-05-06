import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {EtiquetaAppState} from '../reducers';
import * as fromStore from '../';
import {getEtiquetaLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../../auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    // valorParametro: any;

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<EtiquetaAppState>,
        private _router: Router,
        public _loginService: LoginService
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
        return this.getEtiqueta().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Etiqueta
     *
     * @returns
     */
    getEtiqueta(): any {
        return this._store.pipe(
            select(getEtiquetaLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['etiquetaHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateEtiqueta());
                    } else {
                        const params: any = {
                            filter: {id: 'eq:' + this.routerState.params['etiquetaHandle']},
                            context: {isAdmin: true}
                        };
                        this._store.dispatch(new fromStore.GetEtiqueta(params));
                    }
                }

            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

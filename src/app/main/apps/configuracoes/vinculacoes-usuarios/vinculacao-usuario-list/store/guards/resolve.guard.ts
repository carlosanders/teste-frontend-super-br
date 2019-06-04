import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src/router_state';
import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {VinculacaoUsuarioListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getVinculacaoUsuarioListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<VinculacaoUsuarioListAppState>,
        private _loginService: LoginService
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
        return this.getVinculacoesUsuarios().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get VinculacoesUsuarios
     *
     * @returns {Observable<any>}
     */
    getVinculacoesUsuarios(): any {
        return this._store.pipe(
            select(getVinculacaoUsuarioListLoaded),
            tap((loaded: any) => {
                if (!loaded) {

                    const params = {
                        filter: {
                            'usuario.id': this._loginService.getUserProfile().usuario.id
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {'principal': 'DESC', 'criadoEm': 'DESC'},
                        populate: [
                            'populateAll'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetVinculacoesUsuarios(params));
                }
            }),
            filter((loaded: any) => {
                return !!loaded;
            }),
            take(1)
        );
    }
}
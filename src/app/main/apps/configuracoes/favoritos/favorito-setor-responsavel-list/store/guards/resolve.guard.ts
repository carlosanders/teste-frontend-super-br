import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {FavoritoListSetorResponsavelAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getFavoritoListSetorResponsavelLoaded} from '../selectors';
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
        private _store: Store<FavoritoListSetorResponsavelAppState>,
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
        return this.getFavoritos().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Favoritos
     *
     * @returns {Observable<any>}
     */
    getFavoritos(): any {
        return this._store.pipe(
            select(getFavoritoListSetorResponsavelLoaded),
            tap((loaded: any) => {
                if (!loaded) {

                    const params = {
                        filter: {
                            'setorResponsavel': 'isNotNull',
                            'prioritario': 'eq:' + 'true',
                            'usuario.id': 'eq:' + this._loginService.getUserProfile().usuario.id
                        },
                        gridFilter: {},
                        limit: 5,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'setorResponsavel', 'setorResponsavel.unidade'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetFavoritos(params));
                }
            }),
            filter((loaded: any) => {
                return !!loaded;
            }),
            take(1)
        );
    }
}

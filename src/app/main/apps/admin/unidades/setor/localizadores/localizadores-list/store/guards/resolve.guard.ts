import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {RootLocalizadoresListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getLocalizadorListLoaded} from '../selectors';
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
        private _store: Store<RootLocalizadoresListAppState>,
        public _loginService: LoginService
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
        return this.getLocalizadores().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Localizadores
     *
     * @returns {Observable<any>}
     */
    getLocalizadores(): any {
        return this._store.pipe(
            select(getLocalizadorListLoaded),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['setorHandle'] !== loaded.value) {

                    const params = {

                        filter: {
                            'setor.unidade.id': 'eq:' + this.routerState.params.unidadeHandle,
                            'setor.id': 'eq:' + this.routerState.params.setorHandle
                        },

                        gridFilter: {},
                        limit: 5,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                        ],
                        context: {
                            isAdmin: true
                        }
                    };

                    this._store.dispatch(new fromStore.GetLocalizadores(params));
                }
            }),
            filter((loaded: any) => {
                return loaded.id === 'setorHandle' && this.routerState.params['setorHandle'] && this.routerState.params['setorHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

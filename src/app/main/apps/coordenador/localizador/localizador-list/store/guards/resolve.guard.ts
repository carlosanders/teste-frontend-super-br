import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {LocalizadorListAppState} from '../reducers';
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
        private _store: Store<LocalizadorListAppState>,
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
        return this.getLocalizadores().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Localizadores
     *
     * @returns
     */
    getLocalizadores(): any {
        return this._store.pipe(
            select(getLocalizadorListLoaded),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['setorHandle'] !== loaded.value) {

                    const params = {

                        filter: {
                            'setor.id': 'eq:' + this.routerState.params.setorHandle
                        },

                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                        ],
                    };

                    this._store.dispatch(new fromStore.GetLocalizadores(params));
                }
            }),
            filter((loaded: any) => loaded.id === 'setorHandle' && this.routerState.params['setorHandle'] && this.routerState.params['setorHandle'] === loaded.value),
            take(1)
        );
    }
}

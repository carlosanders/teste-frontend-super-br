import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {UnidadesListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getUnidadesListLoaded} from '../selectors';
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
        private _store: Store<UnidadesListAppState>,
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
        return this.getUnidades().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Setor[]
     *
     * @returns
     */
    getUnidades(): any {
        return this._store.pipe(
            select(getUnidadesListLoaded),
            tap((loaded: any) => {
                if (!loaded) {

                    const params = {

                        filter: {
                            parent: 'isNull'
                        },

                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {},
                        populate: [
                            'populateAll'
                        ],
                        context: {
                            isAdmin: true
                        }
                    };

                    this._store.dispatch(new fromStore.GetUnidades(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }
}

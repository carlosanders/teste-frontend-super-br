import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {EspecieSetorListAppState} from '../reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEspecieSetorListLoaded} from '../';


@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<EspecieSetorListAppState>,
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
        return this.getEspecieSetor().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get EspecieSetor
     *
     * @returns {Observable<any>}
     */
    getEspecieSetor(): Observable<any> {
        return this._store.pipe(
            select(getEspecieSetorListLoaded),
            tap((loaded: any) => {
                if (!loaded) {
                    const params = {
                        filter: {},
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll'
                        ],
                        context: {isAdmin: true}
                    };

                    this._store.dispatch(new fromStore.GetEspecieSetor(params));
                }
            }),
            filter((loaded: any) => {
                return !!loaded;
            }),
            take(1)
        );
    }

}

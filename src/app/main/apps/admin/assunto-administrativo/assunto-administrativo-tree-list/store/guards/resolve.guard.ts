import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getAssuntoAdministrativoTreeListLoaded} from '../';
import {getRouterState} from 'app/store/reducers';
import {AssuntoAdministrativoTreeListAppState} from '../reducers';
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
        private _store: Store<AssuntoAdministrativoTreeListAppState>,
        private _loginService: LoginService
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
        return this.getAssuntoAdministrativo().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get AssuntoAdministrativo
     *
     * @returns
     */
    getAssuntoAdministrativo(): Observable<any> {
        return this._store.pipe(
            select(getAssuntoAdministrativoTreeListLoaded),
            tap((loaded: any) => {
                if (!loaded) {
                    const params = {
                        filter: {
                            parent: 'isNull'
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll'
                        ],
                        context: {isAdmin: true}
                    };

                    this._store.dispatch(new fromStore.GetAssuntoAdministrativo(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }

}

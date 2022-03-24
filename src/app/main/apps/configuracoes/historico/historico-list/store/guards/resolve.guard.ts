import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {HistoricoConfigListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getHistoricoConfigListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';
import * as moment from "moment";

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<HistoricoConfigListAppState>,
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
        return this.getHistoricoConfig().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Historico
     *
     * @returns
     */
    getHistoricoConfig(): any {
        return this._store.pipe(
            select(getHistoricoConfigListLoaded),
            tap((loaded: any) => {
                if (!loaded) {

                    const params = {
                        filter: {
                            'criadoPor.id': 'eq:' + this._loginService.getUserProfile().id,
                            'criadoEm' : 'gt:' + moment().subtract(30, 'days').format('YYYY-MM-DDTHH:mm:ss')
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                        ],
                    };
                    this._store.dispatch(new fromStore.GetHistoricoConfig(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }
}

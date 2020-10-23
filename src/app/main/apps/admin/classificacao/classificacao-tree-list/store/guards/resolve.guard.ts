import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {ClassificacaoTreeListAppState} from '../reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {getClassificacaoTreeListLoaded} from '../';


@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<ClassificacaoTreeListAppState>,
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
        return this.getClassificacao().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Classificacao
     *
     * @returns {Observable<any>}
     */
    getClassificacao(): Observable<any> {
        return this._store.pipe(
            select(getClassificacaoTreeListLoaded),
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

                    this._store.dispatch(new fromStore.GetClassificacao(params));
                }
            }),
            filter((loaded: any) => {
                return !!loaded;
            }),
            take(1)
        );
    }

}

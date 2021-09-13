import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {SetorListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getSetorListLoaded} from '../selectors';
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
        private _store: Store<SetorListAppState>,
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
        return this.getSetores().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Setores
     *
     * @returns
     */
    getSetores(): any {
        return this._store.pipe(
            select(getSetorListLoaded),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['unidadeHandle'] !== loaded.value) {
                    const params = {

                        filter: {
                            'unidade.id': 'eq:' + this.routerState.params.unidadeHandle,
                            'parent': 'isNotNull'
                        },

                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll'
                        ],
                        context: {
                            isAdmin: true
                        }
                    };

                    this._store.dispatch(new fromStore.GetSetores(params));
                }
            }),
            filter((loaded: any) => loaded.id === 'unidadeHandle' && this.routerState.params['unidadeHandle'] && this.routerState.params['unidadeHandle'] === loaded.value),
            take(1)
        );
    }
}

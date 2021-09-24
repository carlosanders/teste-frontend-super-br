import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {CompetenciasListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getCompetenciasListLoaded} from '../selectors';
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
        private _store: Store<CompetenciasListAppState>,
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
        return this.getCompetencias().pipe(
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
    getCompetencias(): any {
        return this._store.pipe(
            select(getCompetenciasListLoaded),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['unidadeHandle'] !== loaded.value) {

                    const params = {

                        filter: {
                            'setor.id': 'eq:' + this.routerState.params['unidadeHandle']
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

                    this._store.dispatch(new fromStore.GetCompetencias(params));
                }
            }),
            filter((loaded: any) => loaded.id === 'unidadeHandle' && this.routerState.params['unidadeHandle'] && this.routerState.params['unidadeHandle'] === loaded.value),
            take(1)
        );
    }
}

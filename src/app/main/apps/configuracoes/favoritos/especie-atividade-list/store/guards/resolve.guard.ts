import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src/router_state';
import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {EspecieAtividadeListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getEspecieAtividadeListLoaded} from '../selectors';
import {LoginService} from '../../../../../../auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<EspecieAtividadeListAppState>} _store
     * @param _loginService
     */
    constructor(
        private _store: Store<EspecieAtividadeListAppState>,
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
        return this.getEspeciesAtividades().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get EspeciesAtividades
     *
     * @returns {Observable<any>}
     */
    getEspeciesAtividades(): any {
        return this._store.pipe(
            select(getEspecieAtividadeListLoaded),
            tap((loaded: any) => {
                if (!loaded) {

                    const params = {
                        filter: {
                            'favoritos.usuario.id': this._loginService.getUserProfile().usuario.id
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {'principal': 'DESC', 'criadoEm': 'DESC'},
                        populate: [
                            'favoritos'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetEspeciesAtividades(params));
                }
            }),
            filter((loaded: any) => {
                return !!loaded;
            }),
            take(1)
        );
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {AfastamentosListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getAfastamentosListLoaded} from '../selectors';
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
        private _store: Store<AfastamentosListAppState>,
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
        return this.getAfastamentos().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Afastamentos
     *
     * @returns {Observable<any>}
     */
    getAfastamentos(): any {
        return this._store.pipe(
            select(getAfastamentosListLoaded),
            tap((loaded: any) => {
                if (!loaded || (this.routerState.params['usuarioHandle'] !== loaded.value)) {
                    const params = {
                        filter: {
                            'colaborador.usuario.id': 'eq:' + this.routerState.params['usuarioHandle']
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll',
                            'colaborador',
                            'colaborador.cargo',
                            'colaborador.modalidadeColaborador',
                            'colaborador.usuario',
                            'colaborador.usuario.colaborador',
                        ],
                        context: {}
                    };

                    this._store.dispatch(new fromStore.GetAfastamentos(params));
                }
            }),
            filter((loaded: any) => {
                return loaded && this.routerState.params['usuarioHandle'] && this.routerState.params['usuarioHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ModelosEspecieSetorListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getModelosEspecieSetorListLoaded} from '../selectors';
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
        private _store: Store<ModelosEspecieSetorListAppState>,
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
        return this.getVinculacoesModelo().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Afastamentos
     *
     * @returns {Observable<any>}
     */
    getVinculacoesModelo(): any {
        return this._store.pipe(
            select(getModelosEspecieSetorListLoaded),
            tap((loaded: any) => {
                if (!loaded || (this.routerState.params['modeloHandle'] !== loaded.value)) {
                    let filtro;
                    if (this.routerState.params['generoHandle'] === 'unidade') {
                        filtro = {
                            'modelo.id': 'eq:' + this.routerState.params['modeloHandle'],
                            'unidade.id' : 'eq:' + this.routerState.params['entidadeHandle'],
                            'especieSetor.id': 'isNotNull'
                        };
                    }
                    if (this.routerState.params['generoHandle'] === 'nacional') {
                        filtro = {
                            'modelo.id': 'eq:' + this.routerState.params['modeloHandle'],
                            'orgaoCentral.id' : 'eq:' + this.routerState.params['entidadeHandle'],
                            'especieSetor.id': 'isNotNull'
                        };
                    }
                    const params = {
                        filter: filtro,
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll'
                        ],
                        context: {}
                    };

                    this._store.dispatch(new fromStore.GetModelosEspecieSetor(params));
                }
            }),
            filter((loaded: any) => {
                return loaded && this.routerState.params['modeloHandle'] && this.routerState.params['modeloHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

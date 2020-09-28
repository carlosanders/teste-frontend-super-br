import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {EtiquetaListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getEtiquetaListLoaded} from '../selectors';
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
        private _store: Store<EtiquetaListAppState>,
        public _loginService: LoginService
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
        return this.getEtiquetas().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Etiquetas
     *
     * @returns {Observable<any>}
     */
    getEtiquetas(): any {
        return this._store.pipe(
            select(getEtiquetaListLoaded),
            tap((loaded: any) => {
                if (this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                        + this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['setorHandle'] !==
                        loaded.value)
                    || (this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                            + this.routerState.params['setorHandle'] !== loaded.value))
                    || (!this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                            + this.routerState.params['unidadeHandle'] !== loaded.value))
                    || (!this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] !==
                            loaded.value))) {

                    const params = {
                        filter: {},
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll'
                        ]
                    };

                    if (this.routerState.params.generoHandle === 'nacional' && !this.routerState.params.unidadeHandle) {
                        params.filter = {
                            ...params.filter,
                            'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'eq:' + this.routerState.params['entidadeHandle']
                        };
                    }
                    if ((this.routerState.params.generoHandle === 'unidade' && !this.routerState.params.setorHandle)
                        || (this.routerState.params.unidadeHandle && !this.routerState.params.setorHandle)) {
                        const valor = this.routerState.params.unidadeHandle ?
                            this.routerState.params['unidadeHandle'] : this.routerState.params['entidadeHandle'];
                        params.filter = {
                            ...params.filter,
                            'vinculacoesEtiquetas.unidade.id': 'eq:' + valor
                        };
                    }
                    if (this.routerState.params.generoHandle === 'local' || this.routerState.params.setorHandle) {
                        const valor = this.routerState.params.setorHandle ?
                            this.routerState.params['setorHandle'] : this.routerState.params['entidadeHandle'];
                        params.filter = {
                            ...params.filter,
                            'vinculacoesEtiquetas.setor.id': 'eq:' + valor
                        };
                    }

                    this._store.dispatch(new fromStore.GetEtiquetas(params));
                }
            }),
            filter((loaded: any) => {
                return (this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                        + this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['setorHandle'] ===
                        loaded.value)
                    || (this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                            + this.routerState.params['setorHandle'] === loaded.value))
                    || (!this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                            + this.routerState.params['unidadeHandle'] === loaded.value))
                    || (!this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] ===
                            loaded.value)));
            }),
            take(1)
        );
    }
}

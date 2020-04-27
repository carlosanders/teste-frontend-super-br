import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {RootLotacaoListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getLotacaoListLoaded} from '../selectors';
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
        private _store: Store<RootLotacaoListAppState>,
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
        return this.getLotacoes().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Lotacoes
     *
     * @returns {Observable<any>}
     */
    getLotacoes(): any {
        return this._store.pipe(
            select(getLotacaoListLoaded),
            tap((loaded: any) => {
                if (!loaded || ('setorHandle' === loaded.id) && this.routerState.params['setorHandle'] !== loaded.value) {

                    let filter: any;
                    filter = {
                        'setor.id':'eq:' + this.routerState.params['setorHandle']
                    };
                    const params = {
                        filter: filter,
                        gridFilter: {},
                        limit: 5,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                            'colaborador.usuario'
                        ],
                        context: {
                            'isAdmin': true
                        }
                    };

                    this._store.dispatch(new fromStore.GetLotacoes(params));
                }
            }),
            filter((loaded: any) => {
                return loaded.id === 'setorHandle' && this.routerState.params['setorHandle'] && this.routerState.params['setorHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

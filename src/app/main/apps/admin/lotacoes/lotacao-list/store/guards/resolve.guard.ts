import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {RootLotacaoListAppState} from '../reducers';
import * as fromStore from '../index';
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
        return this.getLotacoes().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Lotacoes
     *
     * @returns
     */
    getLotacoes(): any {
        return this._store.pipe(
            select(getLotacaoListLoaded),
            tap((loaded: any) => {
                if (!loaded ||
                    (('usuarioHandle' === loaded.id) && this.routerState.params['usuarioHandle'] !== loaded.value)
                    || (('setorHandle' === loaded.id) && this.routerState.params['setorHandle'] !== loaded.value)) {

                    let filter: any;
                    filter = {};
                    if (this.routerState.params['setorHandle']) {
                        filter = {
                            ...filter,
                            'setor.id': 'eq:' + this.routerState.params['setorHandle']
                        };
                    }
                    if (this.routerState.params['usuarioHandle']) {
                        filter = {
                            ...filter,
                            'colaborador.usuario.id': 'eq:' + this.routerState.params['usuarioHandle']
                        };
                    }
                    const params = {
                        filter: filter,
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade',
                            'setor.especieSetor',
                            'setor.generoSetor',
                            'setor.parent',
                            'colaborador.usuario'
                        ],
                        context: {
                            isAdmin: true
                        }
                    };

                    this._store.dispatch(new fromStore.GetLotacoes(params));
                }
            }),
            filter((loaded: any) => loaded.id === 'usuarioHandle' && this.routerState.params['usuarioHandle'] && this.routerState.params['usuarioHandle'] === loaded.value ||
                loaded.id === 'setorHandle' && this.routerState.params['setorHandle'] && this.routerState.params['setorHandle'] === loaded.value),
            take(1)
        );
    }
}

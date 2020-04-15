import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {RepositoriosListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getRepositoriosListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador, Setor} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    _profile: Colaborador;

    setores: Setor[] = [];

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<RepositoriosListAppState>,
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
        return this.getRepositorios().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Repositorios
     *
     * @returns {Observable<any>}
     */
    getRepositorios(): any {
        return this._store.pipe(
            select(getRepositoriosListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['generoHandle'] || !this.routerState.params['entidadeHandle']
                    || (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] !==
                        loaded.value)) {

                    let params: any = {
                        filter: {},
                        gridFilter: {},
                        limit: 5,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'documento',
                            'documento.componentesDigitais',
                            'documento.tipoDocumento',
                            'modalidadeRepositorio',
                            'vinculacoesRepositorios',
                            'vinculacoesRepositorios.setor',
                            'vinculacoesRepositorios.orgaoCentral'
                        ],
                        context: {
                            'isCoordenador': true
                        }
                    };


                    if (this.routerState.params.generoHandle === 'nacional') {
                        params.filter = {
                            ...params.filter,
                            'vinculacoesRepositorios.orgaoCentral.id': 'eq:' + this.routerState.params['entidadeHandle']
                        }
                    }
                    if (this.routerState.params.generoHandle === 'local') {
                        params.filter = {
                            ...params.filter,
                            'vinculacoesRepositorios.setor.id': 'eq:' + this.routerState.params['entidadeHandle']
                        }
                    }

                    this._store.dispatch(new fromStore.GetRepositorios(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['generoHandle'] && this.routerState.params['entidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] ===
                        loaded.value);
            }),
            take(1)
        );
    }
}

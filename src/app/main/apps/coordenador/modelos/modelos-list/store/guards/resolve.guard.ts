import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ModelosListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getModelosListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador, Lotacao, Setor} from '@cdk/models';

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
        private _store: Store<ModelosListAppState>,
        public _loginService: LoginService
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = this._loginService.getUserProfile().colaborador;

        this._profile.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.setores.includes(lotacao.setor) && lotacao.coordenador) {
                this.setores.push(lotacao.setor);
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
        return this.getModelos().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Modelos
     *
     * @returns {Observable<any>}
     */
    getModelos(): any {
        return this._store.pipe(
            select(getModelosListLoaded),
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
                            'template',
                            'modalidadeModelo',
                            'vinculacoesModelos',
                            'vinculacoesModelos.setor',
                            'vinculacoesModelos.orgaoCentral',
                        ],
                        context: {
                            'isCoordenador': true
                        }
                    };

                    if (this.routerState.params.generoHandle === 'nacional') {
                        params.filter = {
                            ...params.filter,
                            'vinculacoesModelos.orgaoCentral.id': 'in:' + this.routerState.params['entidadeHandle']
                        }
                    }
                    if (this.routerState.params.generoHandle === 'local') {
                        params.filter = {
                            ...params.filter,
                            'vinculacoesModelos.setor.id': 'eq:' + this.routerState.params['entidadeHandle']
                        }
                    }

                    this._store.dispatch(new fromStore.GetModelos(params));
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

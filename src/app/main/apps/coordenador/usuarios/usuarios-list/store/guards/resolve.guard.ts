import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {UsuariosListAppState} from '../reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {getUsuariosListLoaded} from '../';
import {Colaborador, Lotacao, Setor} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    colaborador: Colaborador;

    setoresCoordenador: Setor[] = [];

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<UsuariosListAppState>,
        private _loginService: LoginService
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.colaborador = this._loginService.getUserProfile().colaborador;

        this.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (lotacao.coordenador && !this.setoresCoordenador.includes(lotacao.setor)) {
                this.setoresCoordenador.push(lotacao.setor);
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
        return this.getUsuarios().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Usuarios
     *
     * @returns {Observable<any>}
     */
    getUsuarios(): Observable<any> {
        return this._store.pipe(
            select(getUsuariosListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['generoHandle'] || !this.routerState.params['entidadeHandle']
                    || (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] !==
                        loaded.value)) {
                    const params: any = {
                        filter: {},
                        gridFilter: {},
                        limit: 5,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'populateAll',
                            'colaborador',
                            'colaborador.cargo',
                            'colaborador.modalidadeColaborador'
                        ],
                        context: {}
                    };

                    if (this.routerState.params.generoHandle === 'nacional') {
                        params.filter = {
                            ...params.filter,
                            'colaborador.lotacoes.setor.unidade.modalidadeOrgaoCentral.id': 'eq:' + this.routerState.params['entidadeHandle']
                        }
                    }
                    if (this.routerState.params.generoHandle === 'local') {
                        params.filter = {
                            ...params.filter,
                            'colaborador.lotacoes.setor.id': 'eq:' + this.routerState.params['entidadeHandle']
                        }
                    }

                    this._store.dispatch(new fromStore.GetUsuarios(params));
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

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {EtiquetaListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getEtiquetaListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models';
import {getHasLoaded} from '../../../../store';
import * as fromStoreCoordenador from '../../../../store';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    _profile: Colaborador;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<EtiquetaListAppState>,
        public _loginService: LoginService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });


        this._profile = this._loginService.getUserProfile().colaborador;
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return forkJoin([
            this.getEntidade(),
            this.getEtiquetas(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Etiquetas
     *
     * @returns
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

                    const params: any = {
                        filter: {},
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'DESC'},
                        populate: [
                            'etiqueta',
                            'modalidadeEtiqueta',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.setor',
                            'vinculacoesEtiquetas.modalidadeOrgaoCentral',
                            'vinculacoesEtiquetas.unidade',
                        ],
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
            filter((loaded: any) => (this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
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
                        loaded.value)))),
            take(1)
        );
    }

    /**
     * Get Entidade
     *
     * @returns
     */
    getEntidade(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['generoHandle'] || !this.routerState.params['entidadeHandle']
                    || (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] !==
                        loaded.value)) {
                    if (this.routerState.params['generoHandle'] === 'nacional') {
                        this._store.dispatch(new fromStoreCoordenador.GetOrgaoCentral({
                            id: 'eq:' + this.routerState.params['entidadeHandle']
                        }));
                    } else if (this.routerState.params['generoHandle'] === 'unidade') {
                        this._store.dispatch(new fromStoreCoordenador.GetUnidade({
                            id: 'eq:' + this.routerState.params['entidadeHandle']
                        }));
                    } else if (this.routerState.params['generoHandle'] === 'local') {
                        this._store.dispatch(new fromStoreCoordenador.GetSetor({
                            id: 'eq:' + this.routerState.params['entidadeHandle']
                        }));
                    }
                }
            }),
            filter((loaded: any) => this.routerState.params['generoHandle'] && this.routerState.params['entidadeHandle'] &&
                (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] ===
                    loaded.value)),
            take(1)
        );
    }
}

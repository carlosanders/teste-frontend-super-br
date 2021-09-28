import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ModelosListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getModelosListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models';
import * as fromStoreCoordenador from '../../../../store';
import {getHasLoaded} from '../../../../store';

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
        private _store: Store<ModelosListAppState>,
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
            this.getModelos(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Modelos
     *
     * @returns
     */
    getModelos(): any {
        return this._store.pipe(
            select(getModelosListLoaded),
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
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'documento',
                            'documento.componentesDigitais',
                            'template',
                            'modalidadeModelo',
                            'vinculacoesModelos',
                            'vinculacoesModelos.setor',
                            'vinculacoesModelos.modalidadeOrgaoCentral',
                            'vinculacoesModelos.unidade',
                        ],
                    };

                    if (this.routerState.params.generoHandle === 'nacional' && !this.routerState.params.unidadeHandle) {
                        params.filter = {
                            ...params.filter,
                            'vinculacoesModelos.modalidadeOrgaoCentral.id': 'eq:' + this.routerState.params['entidadeHandle']
                        };
                    }

                    if ((this.routerState.params.generoHandle === 'unidade' && !this.routerState.params.setorHandle)
                        || (this.routerState.params.unidadeHandle && !this.routerState.params.setorHandle)) {
                        const valor = this.routerState.params.unidadeHandle ?
                            this.routerState.params['unidadeHandle'] : this.routerState.params['entidadeHandle'];
                        params.filter = {
                            ...params.filter,
                            'vinculacoesModelos.unidade.id': 'eq:' + valor
                        };
                    }
                    if (this.routerState.params.generoHandle === 'local' || this.routerState.params.setorHandle) {
                        const valor = this.routerState.params.setorHandle ?
                            this.routerState.params['setorHandle'] : this.routerState.params['entidadeHandle'];
                        params.filter = {
                            ...params.filter,
                            'vinculacoesModelos.setor.id': 'eq:' + valor
                        };
                    }

                    this._store.dispatch(new fromStore.GetModelos(params));
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

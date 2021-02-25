import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {EtiquetaAppState} from '../reducers';
import * as fromStore from '../';
import {getEtiquetaLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {Colaborador} from '@cdk/models';
import {LoginService} from '../../../../../../auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    _profile: Colaborador;

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<EtiquetaAppState>,
        private _router: Router,
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
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getEtiqueta().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Etiqueta
     *
     * @returns {Observable<any>}
     */
    getEtiqueta(): any {
        return this._store.pipe(
            select(getEtiquetaLoaded),
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
                            'documento',
                            'documento.componentesDigitais',
                            'template',
                            'modalidadeEtiqueta',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.setor',
                            'vinculacoesEtiquetas.modalidadeOrgaoCentral',
                            'vinculacoesEtiquetas.unidade',
                        ],
                        context: {
                            isAdmin: true
                        }
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

                    this._store.dispatch(new fromStore.GetEtiqueta(params));
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




        //         if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
        //             if (this.routerState.params['etiquetaHandle'] === 'criar') {
        //                 this._store.dispatch(new fromStore.CreateEtiqueta());
        //             } else {
        //                 this._store.dispatch(new fromStore.GetEtiqueta({
        //                     id: 'eq:' + this.routerState.params['etiquetaHandle']
        //                 }));
        //             }
        //         }
        //
        //     }),
        //     filter((loaded: any) => {
        //         return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
        //     }),
        //     take(1)
        // );
    }
}

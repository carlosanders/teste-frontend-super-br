import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

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
        return this.getVinculacoesModelo().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Afastamentos
     *
     * @returns
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
                            'unidade.id': 'eq:' + this.routerState.params['entidadeHandle'],
                            'especieSetor.id': 'isNotNull'
                        };
                    }
                    if (this.routerState.params['generoHandle'] === 'nacional') {
                        filtro = {
                            'modelo.id': 'eq:' + this.routerState.params['modeloHandle'],
                            'modalidadeOrgaoCentral.id': 'eq:' + this.routerState.params['entidadeHandle'],
                            'especieSetor.id': 'isNotNull'
                        };
                    }
                    const params = {
                        filter: filtro,
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll'
                        ],
                        context: {}
                    };

                    this._store.dispatch(new fromStore.GetModelosEspecieSetor(params));
                }
            }),
            filter((loaded: any) => loaded && this.routerState.params['modeloHandle'] && this.routerState.params['modeloHandle'] === loaded.value),
            take(1)
        );
    }
}

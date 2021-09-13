import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getVinculacaoPessoaUsuarioListLoaded} from '../';
import {getRouterState} from 'app/store/reducers';
import {VinculacaoPessoaUsuarioListAppState} from '../reducers';
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
        private _store: Store<VinculacaoPessoaUsuarioListAppState>,
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
        return this.getVinculacaoPessoaUsuario().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get VinculacaoPessoaUsuario
     *
     * @returns
     */
    getVinculacaoPessoaUsuario(): Observable<any> {
        return this._store.pipe(
            select(getVinculacaoPessoaUsuarioListLoaded),
            tap((loaded: any) => {
                if (!loaded || this.routerState.params['usuariosExternosHandler'] !== loaded.value) {
                    const params = {
                        filter: {
                            'usuarioVinculado.id': 'eq:' + this.routerState.params.usuariosExternosHandler
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll'
                        ],
                    };

                    this._store.dispatch(new fromStore.GetVinculacaoPessoaUsuario(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }

}

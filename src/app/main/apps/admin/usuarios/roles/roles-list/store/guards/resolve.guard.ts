import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {RolesListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getRolesListLoaded} from '../selectors';
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
        private _store: Store<RolesListAppState>,
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
        return this.getRoles().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Roles
     *
     * @returns
     */
    getRoles(): any {
        return this._store.pipe(
            select(getRolesListLoaded),
            tap((loaded: any) => {
                if (!loaded || (this.routerState.params['usuarioHandle'] !== loaded.value)) {
                    const params = {
                        filter: {
                            'usuario.id': 'eq:' + this.routerState.params['usuarioHandle']
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade',
                            'usuario.colaborador',
                        ],
                        context: {}
                    };

                    this._store.dispatch(new fromStore.GetVinculacaoRoles(params));
                }
            }),
            filter((loaded: any) => loaded && this.routerState.params['usuarioHandle'] && this.routerState.params['usuarioHandle'] === loaded.value),
            take(1)
        );
    }
}

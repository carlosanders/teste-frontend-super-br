import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import {AdminAppState} from '../reducers';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {Usuario} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    usuario: Usuario;
    private _profile: Usuario;

    /**
     *
     * @param _router
     * @param _loginService
     * @param _store
     */
    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _store: Store<AdminAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkRole();
    }

    checkRole(): any {
        if (this._profile.roles.filter(this.isAdmin).length === 0) {
            this._router.navigate([
                'apps/painel']
            ).then();
        }
        return true;
    }

    isAdmin(role): any {
        return role === 'ROLE_ADMIN';
    }

}

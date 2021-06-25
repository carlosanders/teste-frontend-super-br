import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LoginService} from '../auth/login/login.service';

@Injectable()
export class RoleGuard implements CanActivate {

    /**
     * @param _loginService
     * @param _router
     */
    constructor(
        private _loginService: LoginService,
        private _router: Router

    ) {}

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const roles = route.data['roles'] as Array<string>;
        if (this.checkRole(roles)) {
            return of(true);
        } else {
            this._router.navigate(['/apps/painel']).then();
        }
    }

    /**
     * @param roles
     */
    checkRole(roles: string[]): boolean {
        let hasAccess = false;
        let accessRoles = [];

        roles.forEach((role) => {
            const roleExp = RegExp(role.replace('*', '.*'), 'i');
            if (this._loginService.getUserProfile().roles.length > 0) {
                accessRoles = this._loginService.getUserProfile().roles.filter((value) => value.match(roleExp));
            }
        });

        accessRoles.forEach((role: string) => {
            if (this._loginService.getUserProfile().roles.includes(role)) {
                hasAccess = true;
                return;
            }
        });
        return hasAccess;
    }
}

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
        } else if(!this._loginService.getUserProfile()) {
            this._router.navigate(['/']).then();
        } else {
            this._router.navigate(['/apps/painel']).then();
        }
    }

    /**
     * @param roles
     */
    checkRole(roles: string[]): boolean {
        const accessRoles = [];

        roles.forEach((role) => {
            const roleExp = RegExp(role.replace('*', '.*'), 'i');
            if (this._loginService.getUserProfile()?.roles.length > 0) {
                accessRoles.push(...this._loginService.getUserProfile().roles.filter(value => value.match(roleExp)));
            }
        });

        return accessRoles.length > 0;
    }
}

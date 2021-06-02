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
        let temRole = false;
        roles.forEach((role: string) => {
            if (this._loginService.getUserProfile().roles.includes(role)) {
                temRole = true;
                return;
            }
        });
        return temRole;
    }
}

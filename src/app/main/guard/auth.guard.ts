import { Injectable } from '@angular/core';
import { Route, Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../auth/login/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.loginService.getToken();
        if (token) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

        return false;
    }

    canLoad(route: Route): boolean {
        const token = this.loginService.getToken();
        if (token) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login']);

        return false;
    }
}

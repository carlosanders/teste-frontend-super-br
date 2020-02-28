import { Injectable } from '@angular/core';
import { Route, Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {LoginService} from "../../../auth/login/login.service";

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate, CanLoad {
    constructor(
        private _router: Router,
        private _loginService: LoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            return true;
        }

        this._router.navigate(['apps/pesquisa/processos']);
        return false;
    }

    canLoad(route: Route): boolean {
        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            return true;
        }

        this._router.navigate(['apps/pesquisa/processos']);
        return false;
    }
}

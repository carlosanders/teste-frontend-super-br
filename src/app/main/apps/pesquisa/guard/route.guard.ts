import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../../../auth/login/login.service';

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
    constructor(
        private _router: Router,
        public _loginService: LoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            return true;
        }

        this._router.navigate(['apps/pesquisa/processos']);
        return false;
    }
}

import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../auth/login/login.service';
import {Store} from '@ngrx/store';
import {GetNotificacoes, State} from '../../store';
import {MercureService} from '../../../@cdk/services/mercure.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    firstConnection = true;

    constructor(
        private router: Router,
        private _loginService: LoginService,
        private _store: Store<State>,
        private _mercureService: MercureService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this._loginService.getToken();
        if (token) {
            this._mercureService.subscribe(this._loginService.getUserProfile().username);
            const params = {
                filter: {
                    'destinatario.id': 'eq:' + this._loginService.getUserProfile().id,
                    'dataHoraLeitura': 'isNull'
                },
                gridFilter: {},
                limit: 30,
                offset: 0,
                sort: {criadoEm: 'DESC'},
                populate: ['populateAll']
            };
            this._store.dispatch(new GetNotificacoes(params));
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});

        return false;
    }
}

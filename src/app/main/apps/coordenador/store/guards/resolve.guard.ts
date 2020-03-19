import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of, throwError} from 'rxjs';
import {switchMap, catchError} from 'rxjs/operators';

import {CoordenadorAppState} from '../reducers';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _router
     * @param _loginService
     * @param _store
     */
    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _store: Store<CoordenadorAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkRole().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * check Role Coordenador
     *
     * @returns {Observable<any>}
     */
    checkRole(): any {
        if (!this._loginService.isGranted('ROLE_COORDENADOR')) {
            this._router.navigate(['/apps/painel']).then(() => {
                return throwError(new Error('Usuário sem permissão'));
            });
        }
        return of(true);
    }
}

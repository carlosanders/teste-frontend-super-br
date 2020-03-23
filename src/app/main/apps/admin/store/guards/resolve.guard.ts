import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of, throwError} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {AdminAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {Lotacao, Setor, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    unidades: Setor[] = [] as Setor[];

    usuario: Usuario;

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

        this.usuario = this._loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.getRouterDefault()) {
            return this.checkRole(this.getUnidade()).pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
        }
    }

    /**
     * check Role admin
     *
     * @returns {Observable<any>}
     */
    checkRole(observable: Observable<any>): any {
        if (!this._loginService.isGranted('ROLE_ADMIN')) {
            this._router.navigate(['/apps/painel']).then(() => {
                return throwError(new Error('Usuário sem permissão'));
            });
        }
        return observable;
    }

    /**
     * Get Setor
     *
     * @returns {Observable<any>}
     */
    getUnidade(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['unidadeHandle'] || this.routerState.params['unidadeHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetUnidade({
                        id: 'eq:' + this.routerState.params['unidadeHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['unidadeHandle'] && this.routerState.params['unidadeHandle'] === loaded.value;
            }),
            take(1)
        );
    }

    getRouterDefault(): boolean {
        if (this.routerState.params['unidadeHandle'] === 'default') {
            this.usuario.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
                if (!this.unidades.includes(lotacao.setor.unidade)) {
                    this.unidades.push(lotacao.setor.unidade);
                }
            });

            this._router.navigate(['apps/admin/' + this.unidades[0].id + '/setor']);
            return false;
        }
        return true;
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {UnidadesOrgaoCentralAppState} from '../reducers';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {Usuario} from '@cdk/models';
import {getHasLoaded, getHasLoadedUnidade} from '../selectors';
import * as fromStore from '../';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

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
        private _store: Store<UnidadesOrgaoCentralAppState>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });


        this.usuario = this._loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.checkRole()) {
            return this.checkStore().pipe(
                switchMap(() => of(true)),
                catchError((err) => {
                    console.log(err);
                    return of(false);
                })
            );
        }
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin(
            this.getOrgaoCentral()
        ).pipe(
            filter(([orgaoLoaded]) => !!(orgaoLoaded)),
            take(1),
            switchMap(() =>
                this.getUnidade()
            )
        );
    }

    /**
     * check Role Coordenador
     *
     * @returns
     */
    checkRole(): boolean {
        if (!this._loginService.isGranted('ROLE_COORDENADOR_ORGAO_CENTRAL_' + this.routerState.params['entidadeHandle'])) {
            this._router.navigate(['/apps/painel']).then(() => throwError(new Error('Usuário sem permissão')));
        }
        return true;
    }

    /**
     * Get ModalidadeOrgaoCentral
     *
     * @returns
     */
    getOrgaoCentral(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (this.routerState.params['entidadeHandle'] && (this.routerState.params['entidadeHandle'] !== loaded.value)) {
                    this._store.dispatch(new fromStore.GetOrgaoCentral({
                        id: 'eq:' + this.routerState.params['entidadeHandle']
                    }));
                }
            }),
            filter((loaded: any) => this.routerState.params['entidadeHandle'] &&
                (this.routerState.params['entidadeHandle'] === loaded.value)),
            take(1)
        );
    }

    /**
     * Get Setor
     *
     * @returns
     */
    getUnidade(): any {
        if (this.routerState.params['unidadeHandle'] !== 'default') {
            return this._store.pipe(
                select(getHasLoadedUnidade),
                tap((loaded: any) => {
                    if (this.routerState.params['unidadeHandle'] && this.routerState.params['unidadeHandle'] !== 'default'
                        && (this.routerState.params['unidadeHandle'] !== loaded.value)) {
                        this._store.dispatch(new fromStore.GetSetor({
                            id: 'eq:' + this.routerState.params['unidadeHandle']
                        }));
                    }
                }),
                filter((loaded: any) => this.routerState.params['unidadeHandle'] &&
                    (this.routerState.params['unidadeHandle'] === loaded.value)),
                take(1)
            );
        }
        return of(true);
    }
}

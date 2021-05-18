import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';
import {ProcessoAppState} from 'app/main/apps/processo/store/reducers';
import * as fromStore from 'app/main/apps/processo/store';
import {getProcessoLoaded} from 'app/main/apps/processo/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {Usuario} from "@cdk/models";
import {LoginService} from "../../../../auth/login/login.service";

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    processoId: number;

    usuario: Usuario;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<ProcessoAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.usuario = this._loginService.getUserProfile();
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.processoId = this.routerState.params['processoCopiaHandle'] ?? this.routerState.params['processoHandle'];
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
        return this.getProcesso().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get Processo
     *
     * @returns {Observable<any>}
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (loaded.acessoNegado) {
                    this._router.navigate([this.routerState.url.split('/processo')[0] + '/processo/' + this.routerState.params.processoHandle + '/acesso-negado']).then();
                } else {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        if (this.routerState.params['processoHandle'] === 'criar') {
                            this._store.dispatch(new fromStore.CreateProcesso());
                        } else {
                            this._store.dispatch(new fromStore.GetProcesso({
                                id: this.routerState.params['processoHandle']
                            }));
                        }
                    }
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}



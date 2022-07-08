import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {ProcessoAppState} from 'app/main/apps/processo/store/reducers';
import * as fromStore from 'app/main/apps/processo/store';
import {getProcessoLoaded} from 'app/main/apps/processo/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {Usuario} from '@cdk/models';
import {LoginService} from '../../../../auth/login/login.service';
import {getProcessoIsLoading} from '../';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;

    usuario: Usuario;
    loadingProcesso: boolean;

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this._store.pipe(
            select(getProcessoIsLoading)
        ).subscribe((loading) => {
            this.loadingProcesso = loading;
        });

        this.loadingProcesso = false;
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getProcesso().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Processo
     *
     * @returns
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (loaded.acessoNegado) {
                    this._router.navigate([this.routerState.url.split('/processo')[0] + '/processo/' + this.routerState.params.processoHandle + '/acesso-negado']).then();
                } else {
                    if (!this.loadingProcesso && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                        if (this.routerState.params['processoHandle'] === 'criar') {
                            this._store.dispatch(new fromStore.CreateProcesso());
                        } else {
                            this.loadingProcesso = true;
                            this._store.dispatch(new fromStore.GetProcesso({
                                id: this.routerState.params['processoHandle']
                            }));
                        }
                    }
                }
            }),
            filter((loaded: any) => !this.loadingProcesso && (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }
}



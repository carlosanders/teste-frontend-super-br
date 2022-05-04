import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ProcessoCapaAppState} from '../reducers';
import * as fromStore from '../index';
import {getProcessoIsLoading, getProcessoLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {Usuario} from '@cdk/models';
import {LoginService} from '../../../../../auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    processoId: number;
    loadedProcesso: boolean;
    usuario: Usuario;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<ProcessoCapaAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.usuario = this._loginService.getUserProfile();
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            this.processoId = this.routerState.params['processoHandle'];
        });

        this._store.pipe(
            select(getProcessoIsLoading)
        ).subscribe((loading) => {
            this.loadedProcesso = loading;
        });

        this.loadedProcesso = false;
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
                if (!this.loadedProcesso && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value || this.processoId !== loaded.value)) {
                    this.loadedProcesso = true;
                    this._store.dispatch(new fromStore.GetProcesso({
                        id: this.processoId
                    }));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

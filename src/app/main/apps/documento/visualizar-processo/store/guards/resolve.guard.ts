import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {EditorVisualizarProcessoAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {Processo} from '@cdk/models';
import {getProcessoLoaded, getProcessoIsLoading, GetProcesso} from '../../../../processo/store';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    processoId: number;
    loading: boolean = false;
    error = null;
    processo: Processo;

    /**
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<EditorVisualizarProcessoAppState>,
        private _router: Router,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._store.pipe(
            select(getProcessoIsLoading)
        ).subscribe((loading: boolean) => {
            this.loading = loading;
        });
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
                    this._router.navigate([
                        this.routerState.url.split('visualizar-processo')[0] + 'visualizar-processo/' + this.routerState.params.processoHandle + '/acesso-negado'
                    ]).then();
                } else {
                    if (!this.loading && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                        this.loading = true;
                        this._store.dispatch(new GetProcesso({id: this.routerState.params['processoHandle']}));
                    }
                }
            }),
            filter((loaded: any) => !this.loading && (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }
}



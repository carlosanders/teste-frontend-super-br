import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {StatusBarramentoAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     */
    constructor(
        private _store: Store<StatusBarramentoAppState>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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
        return this.getStatusBarramentoProcesso().pipe(
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
     * @returns {Observable<any>}
     */
    getStatusBarramentoProcesso(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!loaded ||
                    this.routerState.params['remessaHandle'] !== loaded.remessaId) {
                    this._store.dispatch(new fromStore.GetBarramento({
                        'tramitacao.id': 'eq:' + this.routerState.params['remessaHandle']
                    }));
                }
            }),
            filter((loaded: any) => {
                return loaded;
            }),
            take(1)
        );
    }
}

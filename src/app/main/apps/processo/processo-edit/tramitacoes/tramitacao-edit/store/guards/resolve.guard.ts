import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {TramitacaoEditAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<TramitacaoEditAppState>
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
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getTramitacao().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Tramitacao
     *
     * @returns
     */
    getTramitacao(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['tramitacaoHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateTramitacao());
                    } else {
                        this._store.dispatch(new fromStore.GetTramitacao({
                            id: 'eq:' + this.routerState.params['tramitacaoHandle']
                        }));
                    }

                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

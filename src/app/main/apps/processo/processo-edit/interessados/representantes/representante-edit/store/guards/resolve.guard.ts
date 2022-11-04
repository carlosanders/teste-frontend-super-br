import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import * as fromStore from '../../store';
import {getRouterState, RouterStateUrl} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: RouterStateUrl;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.RepresentanteEditAppState>
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
        return this.getRepresentante().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Representante
     *
     * @returns
     */
    getRepresentante(): any {
        return this._store.pipe(
            select(fromStore.getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['representanteHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateRepresentante());
                    } else {
                        this._store.dispatch(new fromStore.GetRepresentante({
                            id: 'eq:' + this.routerState.params['representanteHandle']
                        }));
                    }

                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

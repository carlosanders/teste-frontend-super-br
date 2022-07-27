import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ComponenteDigitalAppState} from '../reducers';
import * as fromStore from '../index';
import {getComponenteDigitalLoaded} from '../selectors';
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
        private _store: Store<ComponenteDigitalAppState>
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
        return this.getComponenteDigital().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get ComponenteDigital
     *
     * @returns
     */
    getComponenteDigital(): any {
        return this._store.pipe(
            select(getComponenteDigitalLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || parseInt(this.routerState.params[loaded.id], 10) !== loaded.value) {
                    this._store.dispatch(new fromStore.DownloadComponenteDigital());
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && parseInt(this.routerState.params[loaded.id], 10) === loaded.value),
            take(1)
        );
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {ServidorEmailEditAppState} from '../reducers';
import * as fromStore from '../';
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
        private _store: Store<ServidorEmailEditAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
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
        return this.getServidorEmail().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get ServidorEmail
     *
     * @returns
     */
    getServidorEmail(): any {
        return this._store.pipe(
            select(fromStore.getHasLoaded),
            tap((loaded: any) => {

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['servidorEmailHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateServidorEmail());
                    } else {
                        this._store.dispatch(new fromStore.GetServidorEmail({
                            id: 'eq:' + this.routerState.params['servidorEmailHandle']
                        }));
                    }

                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

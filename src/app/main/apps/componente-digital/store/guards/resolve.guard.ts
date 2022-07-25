import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {ComponenteDigitalAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;

    /**
     *
     * @param _store
     * @param _router
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<ComponenteDigitalAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
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
        this._store.dispatch(new fromStore.UnloadComponenteDigital());

        return this._store.pipe(
            select(fromStore.getComponenteDigitalLoaded),
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

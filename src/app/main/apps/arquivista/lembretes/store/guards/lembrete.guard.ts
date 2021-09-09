import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {LembreteAppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {getRouterState} from '../../../../../../store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<LembreteAppState>
    ) {
        this.initRouteState();
    }

    initRouteState(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return undefined;
    }
}

import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {DataPrevistaTransicaoAppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {getRouterState} from '../../../../../../store/reducers';
import {Observable} from 'rxjs';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<DataPrevistaTransicaoAppState>} _store
     */
    constructor(
        private _store: Store<DataPrevistaTransicaoAppState>
    ) {
        this.initRouteState();
    }

    initRouteState(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return undefined;
    }
}
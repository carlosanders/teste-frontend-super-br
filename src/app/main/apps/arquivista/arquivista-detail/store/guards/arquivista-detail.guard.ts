import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ArquivistaDetailAppState} from '../reducers';
import {getRouterState} from '../../../../../../store/reducers';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getHasLoaded} from '../selectors';

export class ArquivistaDetailGuard implements CanActivate{
    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<TarefaDetailAppState>} _store
     */
    constructor(
        private _store: Store<ArquivistaDetailAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
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
        return undefined;
    }





}

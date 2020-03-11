import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LembreteAppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {getRouterState} from '../../../../../../store/reducers';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {getHasLoaded} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<LembreteAppState>} _store
     */
    constructor(
        private _store: Store<LembreteAppState>
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
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // return this.getLembrete().pipe(
        //     switchMap(() => of(true)),
        //     catchError(() => of(false))
        // );
    }

    // /**
    //  * Get Lembrete
    //  *
    //  * @returns {Observable<any>}
    //  */
    // getLembrete(): any {
    //     return this._store.pipe(
    //         select(getHasLoaded),
    //         tap((loaded: any) => {
    //             if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
    //                 if (this.routerState.params[''] === 'criar') {
    //                     this._store.dispatch(new fromStore.CreateLembrete());
    //                 } else {
    //                     this._store.dispatch(new fromStore.GetLembrete({
    //                         id: 'eq:' + this.routerState.params['transicaoHandle']
    //                     }));
    //                 }
    //
    //             }
    //         }),
    //         filter((loaded: any) => {
    //             return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
    //         }),
    //         take(1)
    //     );
    // }
}

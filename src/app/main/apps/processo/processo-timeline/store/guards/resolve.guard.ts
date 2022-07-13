import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {combineLatest, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {ProcessoTimelineAppState} from '../';

@Injectable()
export class ResolveGuard implements CanActivate {

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<ProcessoTimelineAppState>
    ) {
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getTimeline().pipe(
            switchMap(() => of(true)),
            catchError(() => {
                return of(false);
            })
        );
    }

    getTimeline(): any {
        return combineLatest([
            this._store.pipe(select(fromStore.getIsLoaded)),
            this._store.pipe(select(fromStore.getIsLoading)),
            this._store.pipe(select(fromStore.getProcessoHandle)),
        ]).pipe(
            tap(([loaded, loading, processoHandle]) => {
                if (!loading && (!loaded || loaded.value !== processoHandle)) {
                    this._store.dispatch(new fromStore.GetTimeline(processoHandle));
                }
            }),
            filter(([loaded,,processoHandle]) => loaded && loaded.value === processoHandle)
        )
    }
}

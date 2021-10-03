import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {AnexarCopiaAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    processoId: number;

    /**
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<AnexarCopiaAppState>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            this.processoId = parseInt(this.routerState.params['processoCopiaHandle'], 10);
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
        return this.getProcesso().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Processo
     *
     * @returns
     */
    getProcesso(): any {
        return this._store.pipe(
            select(fromStore.getProcessoId),
            tap((processoId: number) => {
                if (this.processoId !== processoId) {
                    this._store.dispatch(new fromStore.GetProcesso(this.processoId));
                }
            }),
            filter((processoId: number) => this.processoId === processoId),
            take(1)
        );
    }
}



import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {CronjobListAppState} from '../reducers';


@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    constructor(
        private _store: Store<CronjobListAppState>
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
        return this.getCronjob().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Cronjob
     *
     * @returns
     */
    getCronjob(): Observable<any> {
        return this._store.pipe(
            select(fromStore.getCronjobListLoaded),
            tap((loaded: any) => {
                if (!loaded) {
                    const params = {
                        filter: {},
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'populateAll',
                            'criadoPor',
                            'apagadoPor',
                            'alteradoPor',
                            'usuarioUltimaExecucao',
                        ],
                    };
                    this._store.dispatch(new fromStore.GetCronjob(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }
}

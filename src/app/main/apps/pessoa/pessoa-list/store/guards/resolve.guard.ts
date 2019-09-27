import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {PessoaListAppState} from 'app/main/apps/pessoa/pessoa-list/store/reducers';
import * as fromStore from 'app/main/apps/pessoa/pessoa-list/store';
import {getRouterState} from 'app/store/reducers';
import {getPessoaListLoaded} from 'app/main/apps/pessoa/pessoa-list/store/selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<PessoaListAppState>} _store
     */
    constructor(
        private _store: Store<PessoaListAppState>
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
        return this.getPessoas().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Pessoas
     *
     * @returns {Observable<any>}
     */
    getPessoas(): any {
        return this._store.pipe(
            select(getPessoaListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let pessoaId = null;

                    const routeParams = of('pessoaHandle');
                    routeParams.subscribe(param => {
                        pessoaId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {},
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {principal: 'DESC', criadoEm: 'DESC'},
                        populate: [
                            'populateAll'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetPessoas(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

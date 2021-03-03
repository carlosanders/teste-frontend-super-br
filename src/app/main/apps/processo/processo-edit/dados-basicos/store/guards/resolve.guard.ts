import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DadosBasicosAppState} from '../reducers';
import * as fromStore from '../';
import {getProcessoLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    needsPopulatedProcesso: any[] = ['populateAll', 'setorAtual.unidade'];

    /**
     * Constructor
     *
     * @param {Store<DadosBasicosAppState>} _store
     */
    constructor(
        private _store: Store<DadosBasicosAppState>
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
        return this.getProcesso().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     *
     * @param loaded
     * @param needs
     */
    isPopulated(loaded, needs): boolean {
        needs.forEach((need) => {
            if (loaded.populate.indexOf(need) === -1) {
                return false;
            }
        });
        return true;
    }

    /**
     * Get Processo
     *
     * @returns {Observable<any>}
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value || !this.isPopulated(loaded, this.needsPopulatedProcesso)) {
                    if (this.routerState.params['processoHandle'] === 'criar' ) {
                        this._store.dispatch(new fromStore.CreateProcesso());
                    } else {
                        this._store.dispatch(new fromStore.GetProcesso({
                            id: this.routerState.params['processoHandle'],
                            populate: this.needsPopulatedProcesso
                        }));
                    }
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value && this.isPopulated(loaded, this.needsPopulatedProcesso);
            }),
            take(1)
        );
    }
}

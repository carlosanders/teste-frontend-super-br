import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {ContaEmailEditAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<ContaEmailEditAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
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
        return this.getContaEmail().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get ContaEmail
     *
     * @returns
     */
    getContaEmail(): any {
        return this._store.pipe(
            select(fromStore.getHasLoaded),
            tap((loaded: any) => {

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['contaEmailHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateContaEmail());
                    } else {
                        this._store.dispatch(new fromStore.GetContaEmail({
                            'id': 'eq:' + this.routerState.params['contaEmailHandle'],
                            'setor.id': `eq:${this.routerState.params['entidadeHandle']}`,
                            'setor.parent': 'isNull'
                        }));
                    }

                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

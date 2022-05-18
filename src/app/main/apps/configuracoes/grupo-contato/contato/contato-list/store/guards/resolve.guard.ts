import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ContatoListAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getContatoListLoaded} from '../selectors';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<ContatoListAppState>,
        public _loginService: LoginService
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
        return this.getContato().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Contato
     *
     * @returns
     */
    getContato(): any {
        return this._store.pipe(
            select(getContatoListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] ||
                    loaded.value === undefined ||
                    (this.routerState.params[loaded.id] !== loaded.value.grupoContato.id)){
                    const params = {
                        filter: {
                            'grupoContato.id': 'eq:' + this.routerState.params['grupoContatoHandle']
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll'
                        ],
                        context: {isAdmin: true}
                    };

                    this._store.dispatch(new fromStore.GetContato(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }
}

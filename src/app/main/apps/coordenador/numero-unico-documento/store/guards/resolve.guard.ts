import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {NumeroUnicoDocumentoAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoaded as getHasLoadedSetorHandle} from '../../../setor/store/selectors';
import {getHasLoadedUnidade as getHasLoadedUnidadeHandle} from '../../../unidades/store/selectors';
import {getHasLoaded as getHasLoadedUnidade} from '../../../store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _router
     * @param _store
     */
    constructor(
        private _router: Router,
        private _store: Store<NumeroUnicoDocumentoAppState>
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
        return this.getSetor().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    getSetor(): any {
        if (this.routerState.params['setorHandle']) {
            return this._store.pipe(
                select(getHasLoadedSetorHandle),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.GetSetorSuccess({
                            loaded: {
                                id: 'setorHandle',
                                value: this.routerState.params['setorHandle']
                            },
                            setorId: this.routerState.params['setorHandle']
                        }));
                    }
                }),
                filter((loaded: any) => loaded),
                take(1)
            );
        } else if (this.routerState.params['unidadeHandle']) {
            return this._store.pipe(
                select(getHasLoadedUnidadeHandle),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.GetSetorSuccess({
                            loaded: {
                                id: 'unidadeHandle',
                                value: this.routerState.params['unidadeHandle']
                            },
                            setorId: this.routerState.params['unidadeHandle']
                        }));
                    }
                }),
                filter((loaded: any) => loaded),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getHasLoadedUnidade),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.GetSetorSuccess({
                            loaded: {
                                id: 'unidadeHandle',
                                value: this.routerState.params['entidadeHandle']
                            },
                            setorId: this.routerState.params['entidadeHandle']
                        }));
                    }
                }),
                filter((loaded: any) => loaded),
                take(1)
            );
        }
    }
}

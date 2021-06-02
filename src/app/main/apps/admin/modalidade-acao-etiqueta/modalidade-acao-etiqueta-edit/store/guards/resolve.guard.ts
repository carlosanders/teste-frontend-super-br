import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ModalidadeAcaoEtiquetaEditAppState} from '../reducers';
import * as fromStore from '../';
import {getHasLoaded} from '../selectors';
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
        private _store: Store<ModalidadeAcaoEtiquetaEditAppState>
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
        return this.getModalidadeAcaoEtiqueta().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get ModalidadeAcaoEtiqueta
     *
     * @returns
     */
    getModalidadeAcaoEtiqueta(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['modalidadeAcaoEtiquetaHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateModalidadeAcaoEtiqueta());
                    } else {
                        this._store.dispatch(new fromStore.GetModalidadeAcaoEtiqueta({
                            id: 'eq:' + this.routerState.params['modalidadeAcaoEtiquetaHandle']
                        }));
                    }

                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

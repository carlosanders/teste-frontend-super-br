import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {DocumentoEditComponentesDigitaisAppState} from '../reducers';
import * as fromStore from '../';
import {getComponenteDigitalLoaded} from '../';
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
        private _store: Store<DocumentoEditComponentesDigitaisAppState>
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
        return this.getComponentesDigitais().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Componentes Digitais
     *
     * @returns
     */
    getComponentesDigitais(): any {
        return this._store.pipe(
            select(getComponenteDigitalLoaded),
            tap((loaded: any) => {
                if (!loaded || !this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    const params = {
                        filter: {
                            'documento.id': 'eq:' + this.routerState.params.documentoHandle
                        }
                    };
                    this._store.dispatch(new fromStore.GetComponentesDigitais(params));
                }
            }),
            filter((loaded: any) => loaded && this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {AcaoListAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {getAcaoListLoaded} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<AcaoListAppState>
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
        return this.getAcoes().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Acoes
     *
     * @returns
     */
    getAcoes(): any {
        return this._store.pipe(
            select(getAcaoListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let etiquetaId = null;

                    const routeParams = of('etiquetaHandle');
                    routeParams.subscribe((param) => {
                        etiquetaId = this.routerState.params[param];
                    });

                    const params = {
                        filter: {
                            'etiqueta.id': 'eq:' + etiquetaId
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'modalidadeAcaoEtiqueta',
                            'modalidadeEtiqueta'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetAcoes(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

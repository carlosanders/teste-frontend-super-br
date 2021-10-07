import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ProcessoViewVinculacaoDocumentoAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {getHasLoaded, getHasLoadedVinculada} from '../selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<ProcessoViewVinculacaoDocumentoAppState>
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
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin([this.getJuntada(), this.getJuntadaVinculada()]).pipe(
            take(1)
        );
    }

    /**
     * Get Juntada
     *
     * @returns
     */
    getJuntada(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetJuntada({
                        juntadaId: this.routerState.params['juntadaHandle'],
                        loaded: {
                            id: 'juntadaHandle',
                            value: this.routerState.params.juntadaHandle
                        }
                    }));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get Juntada Vinculada
     *
     * @returns
     */
    getJuntadaVinculada(): any {
        if (this.routerState.params['juntadaVinculadaHandle']) {
            return this._store.pipe(
                select(getHasLoadedVinculada),
                tap((loaded: any) => {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        this._store.dispatch(new fromStore.GetJuntadaVinculada({
                            juntadaVinculadaId: this.routerState.params['juntadaVinculadaHandle'],
                            loadedVinculada: {
                                id: 'juntadaVinculadaHandle',
                                value: this.routerState.params.juntadaVinculadaHandle
                            }
                        }));
                    }
                }),
                filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getHasLoadedVinculada),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadJuntadaVinculada());
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }
}

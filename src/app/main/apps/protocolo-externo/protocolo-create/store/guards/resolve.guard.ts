import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ProtocoloCreateAppState} from '../reducers';
import * as fromStore from '../';
import {getDocumentosHasLoaded} from '../';
import {getProcessoLoaded} from '../selectors';
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
        private _store: Store<ProtocoloCreateAppState>
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
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(err => of(false))
        );
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin([this.getProcesso(), this.getDocumentos()]).pipe(
            take(1)
        );
    }

    /**
     * Get Processo
     *
     * @returns
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetProcesso({
                        id: `eq:${this.routerState.params['processoHandle']}`
                    }));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    getDocumentos(): any {
        if (this.routerState.params['processoHandle']) {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                        this._store.dispatch(new fromStore.GetDocumentos({'processoOrigem.id': `eq:${this.routerState.params['processoHandle']}`}));
                    }
                }),
                filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(getDocumentosHasLoaded),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadDocumentos());
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }
}

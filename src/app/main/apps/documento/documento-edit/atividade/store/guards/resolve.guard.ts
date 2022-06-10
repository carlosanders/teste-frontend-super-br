import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {DocumentoEditAtividadeAppState} from '../reducers';
import * as fromStore from '../';
import {getDocumentosHasLoaded, getDocumentosVinculadosHasLoaded} from '../';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    loadingDocumentos: boolean = false;
    loadingDocumentosVinculados: boolean = false;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<DocumentoEditAtividadeAppState>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this._store.pipe(
            select(fromStore.getDocumentosLoading)
        ).subscribe((loading) => {
            this.loadingDocumentos = loading;
        })
        this._store.pipe(
            select(fromStore.getIsLoadingDocumentosVinculados)
        ).subscribe((loading) => {
            this.loadingDocumentosVinculados = loading;
        })
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
        return forkJoin([
            this.getDocumentos(),
            this.getDocumentosVinculados()
        ]).pipe(
            take(1)
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    getDocumentos(): any {
        return this._store.pipe(
            select(getDocumentosHasLoaded),
            tap((loaded: any) => {
                if (!this.loadingDocumentos && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    this._store.dispatch(new fromStore.UnloadDocumentos());
                    this.loadingDocumentos = true;
                    this._store.dispatch(new fromStore.GetDocumentos({
                        limit: 10,
                        offset: 0
                    }));
                }
            }),
            filter((loaded: any) => this.loadingDocumentos || (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }

    /**
     * Get Documentos Vinculados
     *
     * @returns
     */
    getDocumentosVinculados(): any {
        return this._store.pipe(
            select(getDocumentosVinculadosHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
                    this.loadingDocumentosVinculados = true;
                    this._store.dispatch(new fromStore.GetDocumentosVinculados({
                        limit: 10,
                        offset: 0
                    }));
                }
            }),
            filter((loaded: any) => this.loadingDocumentosVinculados || (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }
}

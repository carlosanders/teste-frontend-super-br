import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {RelatorioViewAppState} from 'app/main/apps/relatorios/relatorio-view/store/reducers';
import * as fromStore from 'app/main/apps/relatorios/relatorio-view/store';
import {getRelatoriosLoaded} from 'app/main/apps/relatorios/relatorio-view/store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<RelatorioViewAppState>} _store
     */
    constructor(
        private _store: Store<RelatorioViewAppState>
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
        return this.getRelatorios().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Relatorios
     *
     * @returns {Observable<any>}
     */
    getRelatorios(): any {
        return this._store.pipe(
            select(getRelatoriosLoaded),
            tap((loaded: any) => {
                 if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let relatorioFilter = null;

                    const routeParams = of('relatorioHandle');
                    routeParams.subscribe(param => {
                        relatorioFilter = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            id: 'eq:' + relatorioHandle
                        },
                        listFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {},
                        populate: [
                            'documento',
                            'documento.tipoDocumento',
                            'documento.componentesDigitais',
                            'documento.vinculacoesDocumentos',
                            'documento.vinculacoesDocumentos.documentoVinculado',
                            'documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento',
                            'documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetRelatorios(params));
                 }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { switchMap, catchError, tap, take, filter } from 'rxjs/operators';
import * as fromStore from '../../store';
import { DocumentosState } from '../reducers';
import { getRouterState } from 'app/store/reducers';
import { getDocumentosHasLoaded } from '../selectors';
import { getDocumentoAvulso } from '../../../store/selectors';
import { DocumentoAvulso } from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    documentoAvulso: DocumentoAvulso;

    /**
     * Constructor
     *
     * @param {Store<omplementarState>} _store
     */
    constructor(
        private _store: Store<DocumentosState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store
            .pipe(select(getDocumentoAvulso))
            .subscribe(documentoAvulso => {
               this.documentoAvulso = documentoAvulso;
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
        return this.getDocumentos().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Get Documentos
     *
     * @returns {Observable<any>}
     */
    getDocumentos(): any {
        return this._store.pipe(
            select(getDocumentosHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetDocumentos({
                        id: `eq:${this.documentoAvulso.documentoResposta.id}`
                    }));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

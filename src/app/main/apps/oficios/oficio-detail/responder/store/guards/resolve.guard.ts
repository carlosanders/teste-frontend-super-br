import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../../store';
import {DocumentosState} from '../reducers';
import {getRouterState} from 'app/store/reducers';
import {getDocumentosHasLoaded, getDocumentosComplementaresHasLoaded} from '../selectors';
import {DocumentoAvulso} from '@cdk/models';
import {getDocumentoAvulso} from '../../../store';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;

    /**
     *
     * @param _store
     */
    constructor(
        private _store: Store<DocumentosState>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.documentoAvulso$ = this._store.pipe(select(getDocumentoAvulso));
        this.documentoAvulso$.pipe(
            filter(documentoAvulso => !!documentoAvulso)
        ).subscribe(documentoAvulso => this.documentoAvulso = documentoAvulso);
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getDocumentos().pipe(
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
        return forkJoin([this.getDocumentos(), this.getDocumentosComplementares()]).pipe(take(1));
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
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.UnloadDocumentos({reset: true}));
                    this._store.dispatch(new fromStore.GetDocumentos({id: `eq:${this.documentoAvulso.documentoResposta.id}`}));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }

    /**
     * Get Documentos Complementares
     *
     * @returns
     */
    getDocumentosComplementares(): any {
        return this._store.pipe(
            select(getDocumentosComplementaresHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.UnloadDocumentosComplementares({reset: true}));
                    let documentoId = null;

                    const routeParams = of('documentoAvulsoHandle');
                    routeParams.subscribe((param) => {
                        documentoId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'documentoAvulsoComplementacaoResposta.id': documentoId
                        },
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'tipoDocumento',
                            'documentoAvulsoRemessa',
                            'documentoAvulsoRemessa.documentoResposta',
                            'componentesDigitais',
                            'juntadaAtual'
                        ],
                        context: {'incluiVinculacaoDocumentoPrincipal': true}
                    };
                    this._store.dispatch(new fromStore.GetDocumentosComplementares(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

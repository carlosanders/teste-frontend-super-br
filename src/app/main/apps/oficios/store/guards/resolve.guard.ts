import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, catchError, map, tap, take, filter } from 'rxjs/operators';

import { DocumentoAvulsoAppState } from 'app/main/apps/oficios/store/reducers';
import * as fromStore from 'app/main/apps/oficios/store';
import { getDocumentosAvulsoLoaded } from 'app/main/apps/oficios/store/selectors';
import { getRouterState } from 'app/store/reducers';
import { LoginService } from '../../../../auth/login/login.service';
import { Usuario } from '@cdk/models/usuario.model';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<DocumentoAvulsoAppState>,
        private _loginService: LoginService,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * Check store
     *
     * @returns {Observable<any>}
     */
    checkStore(): Observable<any> {
        return forkJoin(
            this.getDocumentosAvulso()
        ).pipe(
            filter(([documentosAvulsoLoaded]) => !!(documentosAvulsoLoaded)),
            take(1)
        );
    }

    /**
     * Get DocumentoAvulso
     *
     * @returns {Observable<any>}
     */
    getDocumentosAvulso(): any {
        return this._store.pipe(
            select(getDocumentosAvulsoLoaded),
            tap((loaded: any) => {
                const params = {
                    listFilter: {},
                    etiquetaFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {dataHoraFinalPrazo: 'ASC'},
                    populate: [
                        'processo',
                        'processo.especieProcesso',
                        'processo.modalidadeMeio',
                        'processo.documentoAvulsoOrigem',
                        'processo.vinculacoesEtiquetas',
                        'processo.vinculacoesEtiquetas.etiqueta',
                        'usuarioResponsavel',
                        'setorResponsavel',
                        'setorResponsavel.unidade',
                        'setorOrigem',
                        'setorOrigem.unidade'
                    ]
                };

                const routeTypeParam = of('oficioTargetHandle');
                routeTypeParam.subscribe(typeParam => {
                    let documentoAvulsoFilter = {};
                    if (this.routerState.params[typeParam] === 'entrada') {
                        documentoAvulsoFilter = {
                            'usuarioResposta.id': 'isNull'
                        };
                    }

                    if (this.routerState.params[typeParam] === 'saida') {
                        documentoAvulsoFilter = {
                            'usuarioResposta.id': 'isNotNull'
                        };
                    }

                    params['filter'] = documentoAvulsoFilter;
                });

                if (!this.routerState.params['oficioTargetHandle'] || this.routerState.params['oficioTargetHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetDocumentosAvulso(params));
                    this._store.dispatch(new fromStore.ChangeSelectedDocumentosAvulso([]));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['oficioTargetHandle'] && this.routerState.params['oficioTargetHandle'] === loaded.value;
            }),
            take(1)
        );
    }
}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, catchError, map, tap, take, filter } from 'rxjs/operators';

import { DocumentoAvulsoAppState } from 'app/main/apps/oficios/store/reducers';
import * as fromStore from 'app/main/apps/oficios/store';
import { getDocumentosAvulsoLoaded } from 'app/main/apps/oficios/store/selectors';
import { getRouterState } from 'app/store/reducers';
import { LoginService } from '../../../../auth/login/login.service';
import { Usuario, VinculacaoPessoaUsuario } from '@cdk/models';


@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    private pessoasConveniadas: VinculacaoPessoaUsuario[];
    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<DocumentoAvulsoAppState>,
        private _loginService: LoginService,
        private _router: Router,
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
        this.pessoasConveniadas = this._profile.vinculacoesPessoasUsuarios;
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.getRouterDefault()) {
            return this.checkStore().pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
        }
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
                        'usuarioResponsavel',
                        'setorResponsavel',
                        'setorResponsavel.unidade',
                        'setorOrigem',
                        'setorOrigem.unidade',
                        'vinculacoesEtiquetas',
                        'vinculacoesEtiquetas.etiqueta'
                    ]
                };

                const routeTypeParam = of('oficioTargetHandle');
                routeTypeParam.subscribe(typeParam => {
                    let documentoAvulsoFilter = {};

                    if (this.routerState.params[typeParam] === 'entrada') {
                        documentoAvulsoFilter = {
                            'usuarioResposta.id': 'isNull',
                            'documentoRemessa.id': 'isNotNull',
                            'pessoaDestino.id': `eq:${this.routerState.params['pessoaHandle']}`
                        };
                    }

                    if (this.routerState.params[typeParam] === 'saida') {
                        documentoAvulsoFilter = {
                            'usuarioResposta.id': 'isNotNull',
                            'documentoRemessa.id': 'isNotNull',
                            'pessoaDestino.id': `eq:${this.routerState.params['pessoaHandle']}`
                        };
                    }

                    params['filter'] = documentoAvulsoFilter;
                });

                if (!this.routerState.params['oficioTargetHandle'] || !this.routerState.params['pessoaHandle']
                    || this.routerState.params['oficioTargetHandle'] + '_' + this.routerState.params['pessoaHandle'] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetDocumentosAvulso(params));
                    this._store.dispatch(new fromStore.ChangeSelectedDocumentosAvulso([]));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['oficioTargetHandle'] + '_' + this.routerState.params['pessoaHandle'] === loaded.value && this.routerState.params['oficioTargetHandle'];
            }),
            take(1)
        );
    }

    getRouterDefault(): boolean {
        if (!this.routerState.params['pessoaHandle']) {
            this._router.navigate(['apps/oficios/entrada/' + this.pessoasConveniadas[0].pessoa.id]);
            return false;
        }

        return true;
    }
}

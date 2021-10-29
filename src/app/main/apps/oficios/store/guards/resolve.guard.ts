import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {DocumentoAvulsoAppState} from '../reducers';
import * as fromStore from 'app/main/apps/oficios/store';
import {getIsLoading} from 'app/main/apps/oficios/store';
import {getDocumentosAvulsoLoaded} from 'app/main/apps/oficios/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Usuario, VinculacaoPessoaUsuario} from '@cdk/models';


@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    loading: boolean = false;
    private _profile: Usuario;
    private pessoasConveniadas: VinculacaoPessoaUsuario[];

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _store: Store<DocumentoAvulsoAppState>,
        public _loginService: LoginService,
        private _router: Router,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });


        this._store.pipe(select(getIsLoading)).subscribe(loading => this.loading = loading);

        this._profile = _loginService.getUserProfile();
        this.pessoasConveniadas = this._profile.vinculacoesPessoasUsuarios;
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.getRouterDefault()) {
            return this.getDocumentosAvulso().pipe(
                switchMap(() => of(true)),
                catchError((err) => {
                    console.log(err);
                    return of(false);
                })
            );
        }
    }

    /**
     * check Role admin
     *
     * @returns
     */
    checkRole(observable: Observable<any>): any {
        if (!this._loginService.isGranted('ROLE_PESSOA_VINCULADA')) {
            this._router.navigate(['/apps/painel']).then(() => throwError(new Error('Usuário sem permissão')));
        }
        return observable;
    }

    /**
     * Get DocumentoAvulso
     *
     * @returns
     */
    getDocumentosAvulso(): any {
        return this._store.pipe(
            select(getDocumentosAvulsoLoaded),
            tap((loaded: any) => {
                if (!this.loading && (!this.routerState.params['oficioTargetHandle'] || !this.routerState.params['pessoaHandle']
                    || this.routerState.params['oficioTargetHandle'] + '_' + this.routerState.params['pessoaHandle'] !== loaded.value)) {

                    this._store.dispatch(new fromStore.UnloadDocumentosAvulso({reset: true}));

                    const params = {
                        listFilter: {},
                        etiquetaFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {dataHoraFinalPrazo: 'ASC'},
                        populate: [
                            'processo',
                            'processo.especieProcesso',
                            'processo.especieProcesso.generoProcesso',
                            'processo.modalidadeMeio',
                            'processo.documentoAvulsoOrigem',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta',
                            'documentoResposta'
                        ]
                    };

                    const routeTypeParam = of('oficioTargetHandle');
                    routeTypeParam.subscribe((typeParam) => {
                        let documentoAvulsoFilter = {};

                        if (this.routerState.params[typeParam] === 'entrada') {

                            documentoAvulsoFilter = {
                                'documentoResposta.id': 'isNull',
                                'documentoRemessa.id': 'isNotNull',
                                'pessoaDestino.id': `eq:${this.routerState.params['pessoaHandle']}`,
                                'dataHoraRemessa': 'isNotNull'
                            };
                        }

                        if (this.routerState.params[typeParam] === 'saida') {
                            documentoAvulsoFilter = {
                                'documentoResposta.id': 'isNotNull',
                                'documentoRemessa.id': 'isNotNull',
                                'pessoaDestino.id': `eq:${this.routerState.params['pessoaHandle']}`,
                                'dataHoraRemessa': 'isNotNull'
                            };
                        }

                        params['filter'] = documentoAvulsoFilter;
                    });

                    this._store.dispatch(new fromStore.GetDocumentosAvulso(params));
                    this._store.dispatch(new fromStore.ChangeSelectedDocumentosAvulso([]));
                    this.loading = true;
                }
            }),
            filter((loaded: any) => this.loading || (this.routerState.params['oficioTargetHandle'] + '_' + this.routerState.params['pessoaHandle'] === loaded.value
                && this.routerState.params['oficioTargetHandle'])),
            take(1)
        );
    }

    getRouterDefault(): boolean {
        if (!this.routerState.params['pessoaHandle'] && this.pessoasConveniadas) {
            this._router.navigate(['apps/oficios/entrada/' + this.pessoasConveniadas[0].pessoa.id]).then();
            return false;
        }

        return true;
    }
}

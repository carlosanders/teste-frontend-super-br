import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of, throwError} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ProcessosAppState} from '../reducers';
import * as fromStore from '../../store';
import {getProcessosLoaded, getPessoaLoaded} from '../selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Usuario, VinculacaoPessoaUsuario} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    private pessoasConveniadas: VinculacaoPessoaUsuario[];
    private unidadeArquivistica = 2;
    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<ProcessosAppState>,
        private _router: Router,
        public _loginService: LoginService
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
        if (this.getRouterDefault()) {
            return this.checkRole(this.checkStore()).pipe(
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
            this.getPessoa()
        ).pipe(
            filter(([pessoaLoaded]) => !!(pessoaLoaded)),
            take(1),
            switchMap(() =>
                this.getProcessos()
            )
        );
    }

    /**
     * check Role admin
     *
     * @returns {Observable<any>}
     */
    checkRole(observable: Observable<any>): any {
        if (!this._loginService.isGranted('ROLE_CONVENIADO')) {
            this._router.navigate(['/apps/painel']).then(() => {
                return throwError(new Error('Usuário sem permissão'));
            });
        }
        return observable;
    }

    /**
     * Get Processos
     *
     * @returns {Observable<any>}
     */
    getProcessos(): any {
        return this._store.pipe(
            select(getProcessosLoaded),
            tap((loaded: any) => {
                if (!loaded) {
                    this._store.dispatch(new fromStore.UnloadProcessos({reset: true}));

                    const params = {
                        filter: {
                            'criadoPor.id': `eq:${this._profile.id}`,
                            'procedencia.id': `eq:${this.routerState.params.pessoaHandle}`,
                            'unidadeArquivistica': `eq:${this.unidadeArquivistica}`
                        },
                        etiquetaFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {dataHoraProximaTransicao: 'ASC', dataHoraAbertura: 'ASC'},
                        populate: [
                            'especieProcesso',
                            'modalidadeMeio',
                            'modalidadeFase',
                            'documentoAvulsoOrigem',
                            'especieProcesso',
                            'classificacao',
                            'classificacao.modalidadeDestinacao',
                            'setorInicial',
                            'setorAtual',
                            'lembretes',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta',
                            'assuntos'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetProcessos(params));
                    this._store.dispatch(new fromStore.ChangeSelectedProcessos([]));
                }
            }),
            filter((loaded: any) => {
                return !!loaded;
            }),
            take(1)
        );
    }

    /**
     * Get Pessoa
     *
     * @returns {Observable<any>}
     */
    getPessoa(): any {
        return this._store.pipe(
            select(getPessoaLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['pessoaHandle'] || this.routerState.params['pessoaHandle'] !== loaded.value) {
                    const params = {
                        filter: {
                            id: `eq:${this.routerState.params['pessoaHandle']}`
                        },
                        limit: 1,
                        offset: 0,
                        sort: {},
                        populate: ['populateAll']
                    };

                    this._store.dispatch(new fromStore.GetPessoa(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['pessoaHandle'] && this.routerState.params['pessoaHandle'] === loaded.value;
            }),
            take(1)
        );
    }

    getRouterDefault(): boolean {
        if (this.routerState.params['pessoaHandle'] === 'default') {
            this._router.navigate(['apps/protocolo-externo/' + this._profile.vinculacoesPessoasUsuarios[0].pessoa.id]);
            return false;
        }

        return true;
    }
}

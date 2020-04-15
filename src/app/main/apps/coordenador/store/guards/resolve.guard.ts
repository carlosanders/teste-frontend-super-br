import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of, throwError} from 'rxjs';
import {switchMap, catchError, tap, filter, take} from 'rxjs/operators';

import {CoordenadorAppState} from '../reducers';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {Lotacao, ModalidadeOrgaoCentral, Setor, Usuario, VinculacaoOrgaoCentralUsuario} from '@cdk/models';
import {getHasLoaded} from "../selectors";
import * as fromStore from "../";

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    setores: Setor[] = [];
    orgaos: ModalidadeOrgaoCentral[] = [];

    usuario: Usuario;

    /**
     *
     * @param _router
     * @param _loginService
     * @param _store
     */
    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _store: Store<CoordenadorAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.usuario = this._loginService.getUserProfile();

        if (this._loginService.isGranted('ROLE_COORDENADOR_NACIONAL')) {
            this.usuario.vinculacoesOrgaoCentralUsuarios.forEach((vinc: VinculacaoOrgaoCentralUsuario) => {
                if (!this.orgaos.includes(vinc.modalidadeOrgaoCentral) && vinc.coordenadorNacional) {
                    this.orgaos.push(vinc.modalidadeOrgaoCentral);
                }
            });
        }
        if (this._loginService.isGranted('ROLE_COORDENADOR')) {
            this.usuario.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
                if (!this.setores.includes(lotacao.setor) && lotacao.coordenador) {
                    this.setores.push(lotacao.setor);
                }
            });
        }
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
            return this.checkRole(this.getEntidade()).pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
        }
    }

    /**
     * check Role Coordenador
     *
     * @returns {Observable<any>}
     */
    checkRole(observable: Observable<any>): any {
        if (!this._loginService.isGranted('ROLE_COORDENADOR')) {
            this._router.navigate(['/apps/painel']).then(() => {
                return throwError(new Error('Usuário sem permissão'));
            });
        }
        if (this.routerState.params['generoHandle'] === 'nacional' && !this._loginService.isGranted('ROLE_COORDENADOR_NACIONAL')) {
            this._router.navigate(['/apps/painel']).then(() => {
                return throwError(new Error('Usuário sem permissão'));
            });
        }
        if (this.routerState.params['generoHandle'] === 'local' && this.setores.length === 0) {
            console.log('Aqui');
            this._router.navigate(['/apps/painel']).then(() => {
                return throwError(new Error('Usuário sem permissão'));
            });
        }
        return observable;
    }

    /**
     * Get Entidade
     *
     * @returns {Observable<any>}
     */
    getEntidade(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['generoHandle'] || !this.routerState.params['entidadeHandle']
                    || (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] !==
                        loaded.value)) {
                    if (this.routerState.params['generoHandle'] === 'nacional') {
                        this._store.dispatch(new fromStore.GetOrgaoCentral({
                            id: 'eq:' + this.routerState.params['entidadeHandle']
                        }));
                    }
                    if (this.routerState.params['generoHandle'] === 'local') {
                        this._store.dispatch(new fromStore.GetSetor({
                            id: 'eq:' + this.routerState.params['entidadeHandle']
                        }));
                    }
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['generoHandle'] && this.routerState.params['entidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] ===
                        loaded.value);
            }),
            take(1)
        );
    }

    getRouterDefault(): boolean {
        if (this.routerState.params['generoHandle'] === 'default') {
            if (this._loginService.isGranted('ROLE_COORDENADOR_NACIONAL')) {
                this.usuario.vinculacoesOrgaoCentralUsuarios.forEach((vinc: VinculacaoOrgaoCentralUsuario) => {
                    if (!this.orgaos.includes(vinc.modalidadeOrgaoCentral) && vinc.coordenadorNacional) {
                        this.orgaos.push(vinc.modalidadeOrgaoCentral);
                    }
                });
            } else {
                this.usuario.colaborador.lotacoes.forEach((lotacao: Lotacao) => {
                    if (!this.setores.includes(lotacao.setor) && lotacao.coordenador) {
                        this.setores.push(lotacao.setor);
                    }
                });
            }

            if (this.orgaos.length) {
                this._router.navigate(['apps/coordenador/nacional/' + this.orgaos[0].id + '/modelos']);
            } else {
                this._router.navigate(['apps/coordenador/local/' + this.setores[0].id + '/modelos']);
            }

            return false;
        }
        return true;
    }
}

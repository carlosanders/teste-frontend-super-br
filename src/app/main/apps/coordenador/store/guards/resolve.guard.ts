import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of, throwError} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {CoordenadorAppState} from '../reducers';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {Coordenador, ModalidadeOrgaoCentral, Setor, Usuario} from '@cdk/models';
import {getHasLoaded} from '../selectors';
import * as fromStore from '../';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    setores: Setor[] = [];
    orgaos: ModalidadeOrgaoCentral[] = [];
    unidades: Setor[] = [];

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });


        this.usuario = this._loginService.getUserProfile();

        this.usuario.coordenadores.forEach((coordenador: Coordenador) => {
            if (coordenador.orgaoCentral && !this.orgaos.includes(coordenador.orgaoCentral)) {
                this.orgaos.push(coordenador.orgaoCentral);
            }
            if (coordenador.unidade && !this.unidades.includes(coordenador.unidade)) {
                this.unidades.push(coordenador.unidade);
            }
            if (coordenador.setor && !this.setores.includes(coordenador.setor)) {
                this.setores.push(coordenador.setor);
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
        if (this.getRouterDefault()) {
            return this.checkRole(this.getEntidade()).pipe(
                switchMap(() => of(true)),
                catchError((err) => {
                    console.log(err);
                    return of(false);
                })
            );
        }
    }

    /**
     * check Role Coordenador
     *
     * @returns
     */
    checkRole(observable: Observable<any>): any {
        if (!this._loginService.isGranted('ROLE_COORDENADOR_SETOR') && !this._loginService.isGranted('ROLE_COORDENADOR_UNIDADE') && !this._loginService.isGranted('ROLE_COORDENADOR_ORGAO_CENTRAL')) {
            this._router.navigate(['/apps/painel']).then(() => throwError(new Error('Usuário sem permissão')));
        }
        if (this.routerState.params['generoHandle'] === 'nacional' && !this._loginService.isGranted('ROLE_COORDENADOR_ORGAO_CENTRAL')) {
            this._router.navigate(['/apps/painel']).then(() => throwError(new Error('Usuário sem permissão')));
        }
        if (this.routerState.params['generoHandle'] === 'unidade' && !this._loginService.isGranted('ROLE_COORDENADOR_UNIDADE')) {
            this._router.navigate(['/apps/painel']).then(() => throwError(new Error('Usuário sem permissão')));
        }
        if (this.routerState.params['generoHandle'] === 'local' && !this._loginService.isGranted('ROLE_COORDENADOR_SETOR')) {
            this._router.navigate(['/apps/painel']).then(() => throwError(new Error('Usuário sem permissão')));
        }
        return observable;
    }

    /**
     * Get Entidade
     *
     * @returns
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
                    } else if (this.routerState.params['generoHandle'] === 'unidade') {
                        this._store.dispatch(new fromStore.GetUnidade({
                            id: 'eq:' + this.routerState.params['entidadeHandle']
                        }));
                    } else if (this.routerState.params['generoHandle'] === 'local') {
                        this._store.dispatch(new fromStore.GetSetor({
                            id: 'eq:' + this.routerState.params['entidadeHandle']
                        }));
                    }
                }
            }),
            filter((loaded: any) => this.routerState.params['generoHandle'] && this.routerState.params['entidadeHandle'] &&
                (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] ===
                    loaded.value)),
            take(1)
        );
    }

    getRouterDefault(): boolean {
        if (this.routerState.params['generoHandle'] === 'default') {
            if (this._loginService.isGranted('ROLE_COORDENADOR_ORGAO_CENTRAL') && this.orgaos.length) {
                this._router.navigate(['apps/coordenador/nacional/' + this.orgaos[0].id + '/modelos']).then();
            } else if (this._loginService.isGranted('ROLE_COORDENADOR_UNIDADE') && this.unidades.length) {
                this._router.navigate(['apps/coordenador/unidade/' + this.unidades[0].id + '/modelos']).then();
            } else if (this._loginService.isGranted('ROLE_COORDENADOR_SETOR') && this.setores.length) {
                this._router.navigate(['apps/coordenador/local/' + this.setores[0].id + '/modelos']).then();
            }
            return false;
        }
        return true;
    }
}

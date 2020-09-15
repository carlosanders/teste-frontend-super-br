import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoEditAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {GetDocumentosVinculados} from '../../anexos/store/actions';
import {getDocumentosVinculadosHasLoaded} from '../../anexos/store/selectors';
import {getRepositoriosLoaded, getRepositoriosPagination} from '../../inteligencia/store/selectors';
import {GetRepositorios} from '../../inteligencia/store/actions';
import {getVisibilidadeListLoaded} from '../../visibilidade/store/selectors';
import {GetVisibilidades} from '../../visibilidade/store/actions';
import {UnloadJuntada} from '../../../store/actions';
import {getSigilosLoaded} from '../../sigilos/store/selectors';
import {GetSigilos} from '../../sigilos/store/actions';
import {LoginService} from '../../../../../auth/login/login.service';
import {getJuntadaLoaded} from '../../juntada/store/selectors';
import {GetJuntada} from '../../juntada/store/actions';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _router
     * @param _loginService
     * @param _store
     */
    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _store: Store<DocumentoEditAppState>
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
        if (this.getRouterDefault()) {
            return this.getResolvers().pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
        }
    }

    /**
     * Get Resolvers
     *
     * @returns {Observable<any>}
     */
    getResolvers(): any {
        switch (this.routerState.params.sidebarHandle) {
            case 'anexos':
                return this._store.pipe(
                    select(getDocumentosVinculadosHasLoaded),
                    tap((loaded: any) => {
                        if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                            this._store.dispatch(new GetDocumentosVinculados());
                        }
                    }),
                    filter((loaded: any) => {
                        return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
                    }),
                    take(1)
                );
            case 'inteligencia':
                return this._store.pipe(
                    select(getRepositoriosLoaded),
                    tap((loaded: any) => {
                        if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                            let repositoriosPagination: any = null;

                            this._store.pipe(select(getRepositoriosPagination)).subscribe(pagination => {
                                repositoriosPagination = pagination;
                            });
                            this._store.dispatch(new GetRepositorios(repositoriosPagination));
                        }
                    }),
                    filter((loaded: any) => {
                        return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
                    }),
                    take(1)
                );
            case 'acesso-restrito':
                return this._store.pipe(
                    select(getVisibilidadeListLoaded),
                    tap((loaded: any) => {
                        if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                            let documentoId = null;

                            const routeParams = of('documentoHandle');
                            routeParams.subscribe(param => {
                                documentoId = this.routerState.params[param];
                            });

                            this._store.dispatch(new GetVisibilidades(documentoId));
                        }
                    }),
                    filter((loaded: any) => {
                        return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
                    }),
                    take(1)
                );
            case 'sigilos':
                this._store.dispatch(new UnloadJuntada());

                return this._store.pipe(
                    select(getSigilosLoaded),
                    tap((loaded: any) => {
                        if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                            let documentoId = null;

                            const routeParams = of('documentoHandle');
                            routeParams.subscribe(param => {
                                documentoId = this.routerState.params[param];
                            });

                            this._store.dispatch(new GetSigilos(documentoId));
                        }
                    }),
                    filter((loaded: any) => {
                        return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
                    }),
                    take(1)
                );
            case 'juntada':
                return this._store.pipe(
                    select(getJuntadaLoaded),
                    tap((loaded: any) => {
                        if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                            let documentoId = null;

                            const routeParams = of('documentoHandle');
                            routeParams.subscribe(param => {
                                documentoId = this.routerState.params[param];
                            });

                            this._store.dispatch(new GetJuntada(documentoId));
                        }
                    }),
                    filter((loaded: any) => {
                        return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
                    }),
                    take(1)
                );

            default:
                return of(true);
        }
    }

    getRouterDefault(): boolean {
        console.log(this.routerState.params['sidebarHandle']);
        if (this.routerState.params['sidebarHandle'] === 'default') {
            if (!this._loginService.isGranted('ROLE_COLABORADOR') || this._router.url.indexOf('/juntadas') !== -1) {
                this._router.navigate([this._router.url.replace('default', 'dados-basicos')]).then();
            } else {
                this._router.navigate([this._router.url.replace('default', 'atividade')]).then();
            }
            return false;
        }
        return true;
    }
}

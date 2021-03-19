import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {DocumentoAvulsoEditModelosAppState} from '../reducers';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {getModelosLoaded} from '../';
import {LoginService} from '../../../../../../auth/login/login.service';
@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<DocumentoAvulsoEditModelosAppState>,
        private _loginService: LoginService
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
        return this.getModelos().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get Modelos
     *
     * @returns {Observable<any>}
     */
    getModelos(): any {
        return this._store.pipe(
            select(getModelosLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    const params = {
                        filter: {
                            orX: [
                                {
                                    'modalidadeModelo.valor': 'eq:EM BRANCO'
                                },
                                {
                                    // Modelos individuais
                                    'modalidadeModelo.valor': 'eq:INDIVIDUAL',
                                    'vinculacoesModelos.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                                },
                                {
                                    // Modelos do setor
                                    'modalidadeModelo.valor': 'eq:LOCAL',
                                    'vinculacoesModelos.setor.id': 'in:' + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')
                                },
                                {
                                    // Modelos da unidade por especie de setor
                                    'modalidadeModelo.valor': 'eq:LOCAL',
                                    'vinculacoesModelos.unidade.id': 'in:'
                                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                                    'vinculacoesModelos.especieSetor.id': 'in:'
                                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                                },
                                {
                                    // Modelos nacionais
                                    'modalidadeModelo.valor': 'eq:NACIONAL',
                                    'vinculacoesModelos.modalidadeOrgaoCentral.id': 'in:'
                                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                                    'vinculacoesModelos.especieSetor.id': 'in:'
                                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                                }
                            ]
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll'
                        ]
                    };
                    this._store.dispatch(new fromStore.GetModelos(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

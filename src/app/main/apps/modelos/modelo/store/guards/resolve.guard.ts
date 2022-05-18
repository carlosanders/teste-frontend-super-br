import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {ModelosAppState} from 'app/main/apps/modelos/modelo/store/reducers';
import * as fromStore from 'app/main/apps/modelos/modelo/store/index';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<ModelosAppState>,
        private _loginService: LoginService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
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
        return this.getModelos().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Modelo
     *
     * @returns
     */
    getModelos(): any {

        this._store.dispatch(new fromStore.UnloadModelos());

        return this._store.pipe(
            select(fromStore.getModelosLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    const params = {
                        filter: {
                            andX: [
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
                            'populateAll',
                            'documento',
                            'documento.componentesDigitais'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetModelos(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

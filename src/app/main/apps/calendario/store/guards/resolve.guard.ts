import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {CalendarioAppState} from 'app/main/apps/calendario/store/reducers';
import * as fromStore from 'app/main/apps/calendario/store';
import {getTarefasLoaded} from 'app/main/apps/calendario/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Usuario} from '@cdk/models';

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
        private _store: Store<CalendarioAppState>,
        public _loginService: LoginService,
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
        return this.getTarefas().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get Tarefas
     *
     * @returns {Observable<any>}
     */
    getTarefas(): any {
        return this._store.pipe(
            select(getTarefasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['typeHandle'] ||
                    !this.routerState.params['targetHandle'] ||
                    (this.routerState.params['typeHandle'] +
                        '_' + this.routerState.params['targetHandle']) !==
                    loaded.value) {

                    this._store.dispatch(new fromStore.UnloadTarefas({reset: true}));

                    const params = {
                        limit: 100,
                        offset: 0,
                        sort: {},
                        populate: [
                            'processo',
                            'especieTarefa',
                            'usuarioResponsavel',
                            'setorResponsavel',
                            'setorResponsavel.unidade',
                            'setorOrigem',
                            'setorOrigem.unidade',
                            'especieTarefa.generoTarefa',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
                        ]
                    };

                    let tarefaFilter = {};

                    const routeTypeParam = of('typeHandle');
                    routeTypeParam.subscribe(typeParam => {

                        if (this.routerState.params[typeParam] === 'coordenacao') {
                            tarefaFilter = {
                                'dataHoraConclusaoPrazo': 'isNull',
                                'especieTarefa.evento': 'eq:true'
                            };
                            const routeTargetParam = of('targetHandle');
                            routeTargetParam.subscribe(targetParam => {
                                tarefaFilter['setorResponsavel.id'] = `eq:${this.routerState.params[targetParam]}`;
                            });
                        }

                        if (this.routerState.params[typeParam] === 'assessor') {
                            tarefaFilter = {
                                'dataHoraConclusaoPrazo': 'isNull',
                                'especieTarefa.evento': 'eq:true'
                            };
                            const routeTargetParam = of('targetHandle');
                            routeTargetParam.subscribe(targetParam => {
                                tarefaFilter['usuarioResponsavel.id'] = `eq:${this.routerState.params[targetParam]}`;
                            });
                        }

                        if (this.routerState.params[typeParam] === 'minhas-tarefas') {
                            tarefaFilter = {
                                'usuarioResponsavel.id': 'eq:' + this._profile.id,
                                'dataHoraConclusaoPrazo': 'isNull',
                                'especieTarefa.evento': 'eq:true'
                            };
                        }

                        if (this.routerState.params[typeParam] === 'compartilhadas') {
                            tarefaFilter = {
                                'compartilhamentos.usuario.id': 'eq:' + this._profile.id,
                                'dataHoraConclusaoPrazo': 'isNull',
                                'especieTarefa.evento': 'eq:true'
                            };
                        }
                    });

                    params['filter'] = tarefaFilter;

                    this._store.dispatch(new fromStore.GetTarefas(params));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['typeHandle'] &&
                    this.routerState.params['targetHandle'] &&
                    (this.routerState.params['typeHandle'] + '_' +
                        this.routerState.params['targetHandle']) ===
                    loaded.value;
            }),
            take(1)
        );
    }
}

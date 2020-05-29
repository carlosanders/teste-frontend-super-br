import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, forkJoin, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {RelatoriosAppState} from 'app/main/apps/relatorios/store/reducers';
import * as fromStore from 'app/main/apps/relatorios/store';
import {getFoldersLoaded, getRelatoriosLoaded} from 'app/main/apps/relatorios/store/selectors';
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
        private _store: Store<RelatoriosAppState>,
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
            this.getFolders()
        ).pipe(
            filter(([foldersLoaded]) => !!(foldersLoaded)),
            take(1),
            switchMap(() =>
                this.getRelatorios()
            )
        );
    }

    /**
     * Get folders
     *
     * @returns {Observable<any>}
     */
    getFolders(): any {
        return this._store.pipe(
            select(getFoldersLoaded),
            tap(loaded => {
                if (!loaded) {
                    this._store.dispatch(new fromStore.GetFolders([]));
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }

    /**
     * Get Relatorios
     *
     * @returns {Observable<any>}
     */
    getRelatorios(): any {
        return this._store.pipe(
            select(getRelatoriosLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params['generoHandle'] || !this.routerState.params['typeHandle'] ||
                    !this.routerState.params['targetHandle'] ||
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] +
                     '_' + this.routerState.params['targetHandle']) !==
                    loaded.value) {

                    this._store.dispatch(new fromStore.UnloadRelatorios({reset: true}));

                    const params = {
                        listFilter: {},
                        etiquetaFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {dataHoraFinalPrazo: 'ASC'},
                        populate: [
                            'populateAll'
                        ]
                    };

                    // const routeTypeParam = of('typeHandle');
                    // routeTypeParam.subscribe(typeParam => {
                    //     let relatorioFilter = {};
                    //     if (this.routerState.params[typeParam] === 'compartilhadas') {
                    //         relatorioFilter = {
                    //             'compartilhamentos.usuario.id': 'eq:' + this._profile.id,
                    //             'dataHoraConclusaoPrazo': 'isNull'
                    //         };
                    //     }
                    //
                    //     if (this.routerState.params[typeParam] === 'minhas-relatorios') {
                    //         relatorioFilter = {
                    //             'usuarioResponsavel.id': 'eq:' + this._profile.id,
                    //             'dataHoraConclusaoPrazo': 'isNull'
                    //         };
                    //         let folderFilter = 'isNull';
                    //         const routeTargetParam = of('targetHandle');
                    //         routeTargetParam.subscribe(targetParam => {
                    //             if (this.routerState.params[targetParam] !== 'entrada' && this.routerState.params[targetParam] !== 'eventos') {
                    //                 const folderName = this.routerState.params[targetParam];
                    //                 folderFilter = `eq:${folderName.toUpperCase()}`;
                    //             }
                    //
                    //             if (this.routerState.params[targetParam] === 'eventos') {
                    //                 relatorioFilter['especieRelatorio.evento'] = 'eq:true';
                    //             } else {
                    //                 relatorioFilter['especieRelatorio.evento'] = 'eq:false';
                    //             }
                    //         });
                    //         params['folderFilter'] = {
                    //             'folder.nome': folderFilter
                    //         };
                    //     }
                    //
                    //     params['filter'] = relatorioFilter;
                    // });
                    //
                    // const routeGeneroParams = of('generoHandle');
                    // routeGeneroParams.subscribe(param => {
                    //     params['filter'] = {
                    //         ...params['filter'],
                    //         'especieRelatorio.generoRelatorio.nome': `eq:${this.routerState.params[param].toUpperCase()}`
                    //     };
                    // });

                    this._store.dispatch(new fromStore.GetRelatorios(params));
                    this._store.dispatch(new fromStore.ChangeSelectedRelatorios([]));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params['generoHandle'] && this.routerState.params['typeHandle'] &&
                    this.routerState.params['targetHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] + '_' +
                        this.routerState.params['targetHandle']) ===
                    loaded.value;
            }),
            take(1)
        );
    }
}

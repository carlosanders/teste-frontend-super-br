import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src/router_state';
import {select, Store} from '@ngrx/store';

import {Observable, forkJoin, of} from 'rxjs';
import {switchMap, catchError, map, tap, take, filter} from 'rxjs/operators';

import {TarefasAppState} from 'app/main/apps/tarefas/store/reducers';
import * as fromStore from 'app/main/apps/tarefas/store';
import {getFoldersLoaded, getTarefasLoaded} from 'app/main/apps/tarefas/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: any;
    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<TarefasAppState>,
        private _loginService: LoginService,
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
                this.getTarefas()
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
     * Get Tarefas
     *
     * @returns {Observable<any>}
     */
    getTarefas(): any {
        return this._store.pipe(
            select(getTarefasLoaded),
            tap((loaded: any) => {

                let folderFilter = 'isNull';

                const routeParams = of('folderHandle');
                routeParams.subscribe(param => {
                    if (this.routerState.params[param] !== 'entrada') {
                        folderFilter = `eq:${this.routerState.params[param]}`;
                    }
                });

                const params = {
                    filter: {
                        'usuarioResponsavel.id': 'eq:' + this._profile.usuario.id,
                        'dataHoraConclusaoPrazo': 'isNull'
                    },
                    folderFilter: {'folder.nome': folderFilter},
                    listFilter: {},
                    etiquetaFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {'dataHoraFinalPrazo': 'ASC'},
                    populate: [
                        'processo',
                        'processo.especieProcesso',
                        'processo.modalidadeMeio',
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

                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    this._store.dispatch(new fromStore.GetTarefas(params));
                    this._store.dispatch(new fromStore.ChangeSelectedTarefas([]));
                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }
}

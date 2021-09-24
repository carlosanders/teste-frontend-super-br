import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {RelatoriosAppState} from 'app/main/apps/relatorios/store/reducers';
import * as fromStore from 'app/main/apps/relatorios/store';
import {getFoldersLoaded, getIsLoading, getRelatoriosLoaded} from 'app/main/apps/relatorios/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Usuario} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    private _profile: Usuario;
    routerState: any;

    loading: boolean = false;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<RelatoriosAppState>,
        public _loginService: LoginService,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });


        this._store
            .pipe(select(getIsLoading))
            .subscribe((loading) => {
                this.loading = loading;
            });

        this._profile = _loginService.getUserProfile();
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            }));
    }

    /**
     * Check store
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin([this.getFolders()]).pipe(
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
     * @returns
     */
    getFolders(): any {
        return this._store.pipe(
            select(getFoldersLoaded),
            tap((loaded) => {
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
     * @returns
     */
    getRelatorios(): any {
        return this._store.pipe(
            select(getRelatoriosLoaded),
            tap((loaded: any) => {
                if (!this.loading && (!this.routerState.params['generoHandle'] || !this.routerState.params['typeHandle'] ||
                    !this.routerState.params['targetHandle'] ||
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] +
                        '_' + this.routerState.params['targetHandle']) !== loaded.value)) {

                    this._store.dispatch(new fromStore.UnloadRelatorios({reset: true}));

                    const params = {
                        filter: {
                            'criadoPor.id': 'eq:' + this._profile.id,
                            'apagadoEm': 'isNull'
                        },
                        etiquetaFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'documento',
                            'tipoRelatorio',
                            'vinculacoesEtiquetas',
                            'vinculacoesEtiquetas.etiqueta'
                        ]
                    };

                    this._store.dispatch(new fromStore.GetRelatorios(params));
                    this._store.dispatch(new fromStore.ChangeSelectedRelatorios([]));
                    this.loading = true;

                }
            }),
            filter((loaded: any) => this.loading || (this.routerState.params['generoHandle'] && this.routerState.params['typeHandle'] &&
                this.routerState.params['targetHandle'] &&
                (this.routerState.params['generoHandle'] + '_' + this.routerState.params['typeHandle'] + '_' +
                    this.routerState.params['targetHandle']) === loaded.value)),
            take(1)
        );
    }
}

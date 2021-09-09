import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {getRouterState} from 'app/store/reducers';
import * as fromStore from '../index';
import {TransicaoArquivistaBlocoAppState} from '../index';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    loading: boolean = false;

    /**
     * Constructor
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<TransicaoArquivistaBlocoAppState>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });


        this._store.pipe(select(fromStore.getIsLoadingModalidadeTransicao));
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getModalidadeTransicao().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get ModalidadeTransicao
     *
     * @returns
     */
    getModalidadeTransicao(): any {
        if (this.routerState.url.indexOf('desarquivar') > -1 || this.routerState.url.indexOf('extravio') > -1) {
            return this._store.pipe(
                select(fromStore.getModalidadeTransicaoLoaded),
                tap((loaded: any) => {
                    if (!this.loading && (!loaded || !this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                        const params = {
                            limit: 1,
                            offset: 0,
                            sort: {},
                            populate: []
                        };
                        if (this.routerState.url.indexOf('desarquivar') > -1) {
                            params['filter'] = {
                                valor: 'eq:DESARQUIVAMENTO'
                            };
                        } else {
                            params['filter'] = {
                                valor: 'eq:EXTRAVIO'
                            };
                        }
                        this._store.dispatch(new fromStore.GetModalidadeTransicao(params));
                        this.loading = true;
                    }
                }),
                filter((loaded: any) => (loaded && this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
                take(1)
            );
        } else {
            return this._store.pipe(
                select(fromStore.getModalidadeTransicaoLoaded),
                tap((loaded: any) => {
                    if (loaded) {
                        this._store.dispatch(new fromStore.UnloadModalidadeTransicao());
                        this.loading = false;
                    }
                }),
                filter((loaded: any) => !loaded),
                take(1)
            );
        }
    }
}

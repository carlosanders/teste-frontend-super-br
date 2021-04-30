import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {getRouterState} from 'app/store/reducers';
import * as fromStore from "../index";
import {getModalidadeTransicaoLoaded, RegistrarExtravioAppState} from "../index";

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    loading: boolean = false;

    /**
     * Constructor
     *
     * @param {Store<RegistrarExtravioAppState>} _store
     * @param _router
     */
    constructor(
        private _store: Store<RegistrarExtravioAppState>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._store.pipe(select(fromStore.getIsLoadingModalidadeTransicao))
    }

    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
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
     * @returns {Observable<any>}
     */
    getModalidadeTransicao(): any {
        return this._store.pipe(
            select(getModalidadeTransicaoLoaded),
            tap((loaded: any) => {
                if (!this.loading && (!loaded || !this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    const params = {
                        limit: 1,
                        offset: 0,
                        sort: {},
                        populate: []
                    };
                    params['filter'] = {
                        valor: 'eq:EXTRAVIO'
                    };
                    this._store.dispatch(new fromStore.GetModalidadeTransicao(params));
                    this.loading = true;
                }
            }),
            filter((loaded: any) => {
                return (loaded && this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value);
            }),
            take(1)
        );
    }
}

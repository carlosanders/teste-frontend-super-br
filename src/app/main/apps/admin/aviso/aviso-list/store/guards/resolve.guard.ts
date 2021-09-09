import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getAvisoListLoaded} from '../';
import {getRouterState} from 'app/store/reducers';
import {AvisoListAppState} from '../reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<AvisoListAppState>,
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
        return this.getAviso().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Aviso
     *
     * @returns
     */
    getAviso(): Observable<any> {
        return this._store.pipe(
            select(getAvisoListLoaded),
            tap((loaded: any) => {
                if (!loaded) {
                    const params = {
                        filter: {},
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {criadoEm: 'ASC'},
                        populate: [
                            'aviso',
                            'vinculacoesAvisos',
                            'vinculacoesAvisos.setor',
                            'vinculacoesAvisos.modalidadeOrgaoCentral',
                            'vinculacoesAvisos.unidade'
                        ],
                    };
                    this._store.dispatch(new fromStore.GetAviso(params));
                }
            }),
            filter((loaded: any) => !!loaded),
            take(1)
        );
    }
}

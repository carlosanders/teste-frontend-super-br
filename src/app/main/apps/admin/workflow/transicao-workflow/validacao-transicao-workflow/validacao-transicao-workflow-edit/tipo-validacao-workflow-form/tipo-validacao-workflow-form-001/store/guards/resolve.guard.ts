import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {TipoValidacaoWorkflowState} from '../../../store/reducers';
import * as fromStore from '../../../store/';
import {getHasLoaded} from '../../../store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    siglaValidacao: string = '';

    /**
     * Constructor
     *
     * @param {Store<TipoValidacaoWorkflowState>} _store
     */
    constructor(
        private _store: Store<TipoValidacaoWorkflowState>
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
        return this.getTipoValidacaoWorkflow().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    /**
     * @returns {Observable<any>}
     */
    getTipoValidacaoWorkflow(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                //!= this.siglaValidacao
                if (!loaded.value || loaded.value) {
                    this._store.dispatch(new fromStore.GetTipoValidacaoWorkflow({
                        //sigla: 'eq:' + this.siglaValidacao
                    }));
                }
            }),
            //filter((loaded: any) => {
                //return loaded.value == this.siglaValidacao;
           // }),
            take(1)
        );
    }
}

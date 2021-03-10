import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, take, filter} from 'rxjs/operators';

import {ValidacaoTransicaoWorkflowEditAppState} from '../reducers';
import * as fromStore from '../index';
import {getRouterState} from 'app/store/reducers';
import {getHasLoaded} from '../selectors';
import {getTipoValidacaoWorkflowListLoaded} from "../selectors/tipo-validacao-workflow.selectors";

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param {Store<ValidacaoTransicaoWorkflowEditAppState>} _store
     */
    constructor(
        private _store: Store<ValidacaoTransicaoWorkflowEditAppState>
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
        return forkJoin([
            this.getValidacao(),
            this.getTipoValidacaoWorkflow(),
          ]).pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
          );
        }
    /**
     * Get Validacao
     *
     * @returns {Observable<any>}
     */
    getValidacao(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                    if (this.routerState.params['validacaoTransicaoWorkflowHandle'] === 'criar') {
                        this._store.dispatch(new fromStore.CreateValidacao());
                    }

                }
            }),
            filter((loaded: any) => {
                return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
            }),
            take(1)
        );
    }


   /**
   * @returns {Observable<any>}
   */
    getTipoValidacaoWorkflow(): any {
    return this._store.pipe(
        select(getTipoValidacaoWorkflowListLoaded),
        tap((loaded: any) => {
        if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
            const params = {
            gridFilter: {},
            limit: 10,
            offset: 0,
            sort: {criadoEm: 'DESC'},
            populate: [
                'populateAll'
            ]
        };

            this._store.dispatch(new fromStore.GetTipoValidacaoWorkflow(params));
        }
        }),
            filter((loaded: any) => {
            return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
        }),
            take(1)
        );
    }
}

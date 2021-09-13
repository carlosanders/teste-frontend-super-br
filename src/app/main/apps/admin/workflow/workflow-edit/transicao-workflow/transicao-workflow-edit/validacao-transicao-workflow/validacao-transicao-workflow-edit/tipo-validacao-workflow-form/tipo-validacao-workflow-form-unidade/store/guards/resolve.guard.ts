import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import * as fromStore from '../../../store';
import {TipoValidacaoWorkflowState} from '../../../store';
import {getHasLoaded} from '../../../store/selectors';
import {getRouterState} from 'app/store/reducers';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    siglaValidacao: string = 'UNIDADE';

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<TipoValidacaoWorkflowState>
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
        return this.getTipoValidacaoWorkflow().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * @returns
     */
    getTipoValidacaoWorkflow(): any {
        return this._store.pipe(
            select(getHasLoaded),
            tap((loaded: any) => {
                if (!loaded.value || loaded.value !== this.siglaValidacao) {
                    this._store.dispatch(new fromStore.GetTipoValidacaoWorkflow({
                        sigla: 'eq:' + this.siglaValidacao
                    }));
                }
            }),
            filter((loaded: any) => loaded.value === this.siglaValidacao),
            take(1)
        );
    }
}

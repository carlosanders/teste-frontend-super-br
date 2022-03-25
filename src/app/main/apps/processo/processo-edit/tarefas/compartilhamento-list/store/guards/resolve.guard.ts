import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {CompartilhamentoListAppState} from 'app/main/apps/processo/processo-edit/tarefas/compartilhamento-list/store/reducers';
import * as fromStore from 'app/main/apps/processo/processo-edit/tarefas/compartilhamento-list/store';
import {getRouterState} from 'app/store/reducers';
import {getCompartilhamentoListLoaded} from 'app/main/apps/processo/processo-edit/tarefas/compartilhamento-list/store/selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<CompartilhamentoListAppState>
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
        return this.getCompartilhamentos().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Compartilhamentos
     *
     * @returns
     */
    getCompartilhamentos(): any {
        return this._store.pipe(
            select(getCompartilhamentoListLoaded),
            tap((loaded: any) => {
                if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {

                    let tarefaId = null;

                    const routeParams = of('tarefaHandle');
                    routeParams.subscribe((param) => {
                        tarefaId = `eq:${this.routerState.params[param]}`;
                    });

                    const params = {
                        filter: {
                            'tarefa.id': tarefaId
                        },
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'tarefa.especieTarefa',
                        ]
                    };

                    this._store.dispatch(new fromStore.GetCompartilhamentos(params));
                }
            }),
            filter((loaded: any) => this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value),
            take(1)
        );
    }
}

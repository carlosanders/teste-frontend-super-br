import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {TarefaDetailAppState} from 'app/main/apps/tarefas/tarefa-detail/store/reducers';
import * as fromStoreProcesso from 'app/main/apps/processo/store';
import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/store';
import {getCurrentTarefa} from 'app/main/apps/tarefas/tarefa-detail/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {getProcessoLoaded, getProcessoIsLoading} from '../../../../processo/store';
import {Tarefa} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;
    error = null;
    loadedProcesso: boolean;
    loadingTarefa: boolean = false;
    loadingProcesso: boolean = false;

    /**
     * Constructor
     *
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<TarefaDetailAppState>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this._store.pipe(
            select(fromStore.getIsLoading)
        ).subscribe((loading) => {
            this.loadingTarefa = loading;
        })
        this._store.pipe(
            select(getProcessoIsLoading)
        ).subscribe((loading) => {
            this.loadingProcesso = loading;
        })
        this.loadedProcesso = false;
        this.loadingProcesso = false;
        this.loadingTarefa = false;
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getTarefa().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Tarefa
     *
     * @returns
     */
    getTarefa(): any {
        return this._store.pipe(
            select(getCurrentTarefa),
            tap((currentTarefa: Tarefa) => {
                if (currentTarefa && currentTarefa.id === parseInt(this.routerState.params['tarefaHandle'], 10)) {
                    this._store.dispatch(new fromStore.GetTarefaSuccess({
                        tarefa: currentTarefa,
                        loaded: {
                            id: 'tarefaHandle',
                            value: this.routerState.params['tarefaHandle']
                        }
                    }));
                } else {
                    if (!this.loadingTarefa && (!currentTarefa || parseInt(this.routerState.params['tarefaHandle'], 10) !== currentTarefa.id)) {
                        this._store.dispatch(new fromStore.GetTarefa({
                            id: this.routerState.params['tarefaHandle']
                        }));
                    }
                }
            }),
            filter((currentTarefa: any) => !this.loadingTarefa && (!!currentTarefa && parseInt(this.routerState.params['tarefaHandle'], 10) === currentTarefa.id)),
            take(1)
        );
    }

    /**
     * Get Processo
     *
     * @returns
     */
    getProcesso(): any {
        return this._store.pipe(
            select(getProcessoLoaded),
            tap((loaded: any) => {
                if (!this.loadingProcesso && (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value)) {
                    if (this.routerState.params['processoHandle'] === 'criar') {
                        this._store.dispatch(new fromStoreProcesso.CreateProcesso());
                    } else {
                        this.loadedProcesso = true;
                        this._store.dispatch(new fromStoreProcesso.GetProcesso({
                            id: this.routerState.params['processoHandle']
                        }));
                    }
                }
            }),
            filter((loaded: any) => !this.loadingProcesso && (this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value)),
            take(1)
        );
    }
}

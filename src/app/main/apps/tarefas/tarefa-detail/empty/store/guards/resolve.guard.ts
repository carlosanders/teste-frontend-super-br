import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {TarefaDetailAppState} from 'app/main/apps/tarefas/tarefa-detail/store/reducers';
import {getCurrentTarefa} from 'app/main/apps/tarefas/tarefa-detail/store/selectors';
import {getRouterState} from 'app/store/reducers';
import {Tarefa} from '@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {
    routerState: any;

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
                if (currentTarefa) {
                    if (currentTarefa.processo?.id) {
                        this._router.navigate([
                            this.routerState.url.replace('/empty', '/processo/' + currentTarefa.processo.id + '/visualizar/latest')
                        ]).then();
                    }
                }
            }),
            filter((currentTarefa: any) => !!currentTarefa),
            take(1)
        );
    }

}

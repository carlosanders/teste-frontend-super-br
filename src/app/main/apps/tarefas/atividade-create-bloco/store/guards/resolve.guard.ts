import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

import {AtividadeCreateBlocoAppState} from 'app/main/apps/tarefas/atividade-create-bloco/store/reducers';
import * as fromStore from 'app/main/apps/tarefas/atividade-create-bloco/store';
import {getRouterState} from 'app/store/reducers';
import {getDocumentosHasLoaded} from '../selectors';
import {getSelectedTarefas} from '../../../store/selectors';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<AtividadeCreateBlocoAppState>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
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
        return this.getDocumentos().pipe(
            switchMap(() => of(true)),
            catchError((err) => {console.log (err); return of(false);})
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    getDocumentos(): any {
        return this._store.pipe(
            select(getDocumentosHasLoaded),
            withLatestFrom(this._store.pipe(select(getSelectedTarefas))),
            tap(([loaded, tarefas]) => {
                if (!loaded && tarefas.length) {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefas.map(tarefa => tarefa.id)));
                }
            }),
            filter((loaded: any) => (loaded[0] === true) && loaded[1].length),
            take(1)
        );
    }
}

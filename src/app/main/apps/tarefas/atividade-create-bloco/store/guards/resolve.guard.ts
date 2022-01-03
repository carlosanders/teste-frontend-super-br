import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import {AtividadeCreateBlocoAppState} from 'app/main/apps/tarefas/atividade-create-bloco/store/reducers';
import * as fromStore from 'app/main/apps/tarefas/atividade-create-bloco/store';
import {getRouterState} from 'app/store/reducers';
import {getSelectedTarefas} from '../../../store';
import {Tarefa} from '../../../../../../../@cdk/models';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;
    selectedTarefas: Tarefa[] = [];
    loadingTarefa: {
        [id: number]: boolean;
    } = {};


    /**
     * Constructor
     *
     * @param _store
     */
    constructor(
        private _store: Store<AtividadeCreateBlocoAppState>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this._store.pipe(
            select(getSelectedTarefas),
            filter(tarefas => !!tarefas)
        ).subscribe((tarefas: Tarefa[]) => {
            tarefas.forEach((tarefa) => {
                this.loadingTarefa[tarefa.id] = false;
            });
            this.selectedTarefas = tarefas;
        });
        this._store.pipe(
            select(fromStore.getDocumentosHasLoaded)
        ).subscribe((loaded) => {
            Object.keys(loaded).forEach((tarefaId) => {
                this.loadingTarefa[parseInt(tarefaId, 10)] = loaded[tarefaId].loading;
            });
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
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    /**
     * Get Documentos
     *
     * @returns
     */
    checkStore(): Observable<any> {
        return forkJoin(
            this.selectedTarefas.map(tarefa => this.getDocumentos(tarefa))
        ).pipe(
            take(1),
        );
    }

    /**
     * Get Documentos Tarefa
     *
     * @returns
     */
    getDocumentos(tarefa: Tarefa): any {
        return this._store.pipe(
            select(fromStore.getDocumentosHasLoadedTarefaId(tarefa.id)),
            tap((loaded) => {
                if (!this.loadingTarefa[tarefa.id] && !loaded && tarefa) {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefa.id));
                    this.loadingTarefa[tarefa.id] = true;
                }
            }),
            filter((loaded: any) => this.loadingTarefa[tarefa.id] || loaded),
            take(1)
        );
    }
}

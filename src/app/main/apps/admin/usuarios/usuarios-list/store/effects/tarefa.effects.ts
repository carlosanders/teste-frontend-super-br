import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as TarefaActions from '../actions';

import {TarefaService} from "@cdk/services/tarefa.service";

@Injectable()
export class TarefaEffects {

    /**
     * @param _actions
     * @param _tarefaService
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _store: Store<State>
    ) {
    }

    /**
     * Distribui tarefas do usuario
     * @type {Observable<any>}
     */
    @Effect()
    distribuirTarefasUsuario: any =
        this._actions
            .pipe(
                ofType<TarefaActions.DistribuirTarefasUsuario>(TarefaActions.DISTRIBUIR_TAREFAS_USUARIO),
                mergeMap((action) => {
                    return this._tarefaService.distribuirTarefasUsuario(action.payload).pipe(
                        map((response) => new TarefaActions.DistribuirTarefasUsuarioSuccess(response.id)),
                        catchError((err) => {
                            return of(new TarefaActions.DistribuirTarefasUsuarioSuccess(action.payload));
                        })
                    );
                })
            );
}
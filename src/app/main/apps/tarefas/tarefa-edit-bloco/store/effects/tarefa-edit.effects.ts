import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import * as TarefaEditActions from '../actions/tarefa-edit.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr/tarefa.schema';
import {Tarefa} from '@cdk/models/tarefa.model';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class TarefaEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Tarefa
     * @type {Observable<any>}
     */
    @Effect()
    saveTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaEditActions.SaveTarefa>(TarefaEditActions.SAVE_TAREFA),
                mergeMap((action) => {
                    console.log (action.payload.changes);
                    return this._tarefaService.patch(action.payload.tarefa, action.payload.changes).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaEditActions.SaveTarefaSuccess(action.payload),
                            new UpdateData<Tarefa>({id: response.id, schema: tarefaSchema, changes: {observacao: response.observacao}}),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${action.payload.tarefa.id} editada com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Houve erro na edição da tarefa id ${action.payload.tarefa.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new TarefaEditActions.SaveTarefaFailed(action.payload));
                        })
                    );
                })
            );

}

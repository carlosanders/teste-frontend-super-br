import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import * as RedistribuicaoEditBlocoActions from '../actions/redistribuicao-edit-bloco.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class TarefaEditBlocoEffect {
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
                ofType<RedistribuicaoEditBlocoActions.SaveTarefa>(RedistribuicaoEditBlocoActions.SAVE_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.save(action.payload.tarefa).pipe(
                        mergeMap((response: Tarefa) => [
                            new RedistribuicaoEditBlocoActions.SaveTarefaSuccess(action.payload),
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
                            return of(new RedistribuicaoEditBlocoActions.SaveTarefaFailed(action.payload));
                        })
                    );
                })
            );

}

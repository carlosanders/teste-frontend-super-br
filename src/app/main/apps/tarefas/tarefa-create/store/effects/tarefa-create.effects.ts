import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';

import * as TarefaCreateActions from '../actions/tarefa-create.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class TarefaCreateEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _store: Store<State>,
        private _router: Router
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
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveTarefa: any =
        this._actions
            .pipe(
                ofType<TarefaCreateActions.SaveTarefa>(TarefaCreateActions.SAVE_TAREFA),
                mergeMap(action => this._tarefaService.save(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaCreateActions.SaveTarefaSuccess(action.payload.bloco),
                            new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} criada com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'tarefa',
                                // eslint-disable-next-line max-len
                                content: `Houve erro na tarefa no processo ${action.payload.processo.NUP} para o setor ${action.payload.setorResponsavel.nome}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new TarefaCreateActions.SaveTarefaFailed(err));
                        })
                    ))
            );

    /**
     * Save Tarefa Success
     */
    @Effect({ dispatch: false })
    saveTarefaSuccess: any =
        this._actions
            .pipe(
                ofType<TarefaCreateActions.SaveTarefaSuccess>(TarefaCreateActions.SAVE_TAREFA_SUCCESS),
                tap((action) => {
                    if (!action.payload) {
                        if (this.routerState.params.processoHandle) {
                            this._router.navigate([this.routerState.url.replace('/criar/' + this.routerState.params.processoHandle, '')]).then();
                        } else {
                            this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
                        }
                    }
                })
            );
}

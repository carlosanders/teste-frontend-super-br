import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

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
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Salvando a tarefa ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._tarefaService.save(action.payload.tarefa).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tarefa',
                                content: 'Tarefa id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Tarefa) => [
                            new TarefaCreateActions.SaveTarefaSuccess(response),
                            new AddData<Tarefa>({data: [response], schema: tarefaSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'tarefa',
                                content: 'Erro ao salvar a tarefa!',
                                status: 2, // erro
                            }));
                            return of(new TarefaCreateActions.SaveTarefaFailed(err));
                        })
                    )
                })
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

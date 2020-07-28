import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as TarefaCreateActions from '../actions/tarefa-create.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
            .subscribe(routerState => {
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
                ofType<TarefaCreateActions.SaveTarefa>(TarefaCreateActions.SAVE_TAREFA),
                mergeMap((action) => {
                    return this._tarefaService.save(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaCreateActions.SaveTarefaSuccess(),
                            new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new TarefaCreateActions.SaveTarefaFailed(err));
                        })
                    );
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
                tap(() => {
                    if (this.routerState.params.processoHandle) {
                        this._router.navigate([this.routerState.url.replace('/criar/' + this.routerState.params.processoHandle, '')]).then();
                    } else {
                        this._router.navigate([this.routerState.url.replace('/criar', '')]).then();
                    }
                })
            );
}

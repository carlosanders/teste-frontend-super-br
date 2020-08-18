import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as TarefaActions from '../actions/tarefa.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {SetSteps} from '../../../../store/actions';

@Injectable()
export class TarefaEffect {
    routerState: any;
    steps: any;

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
                ofType<TarefaActions.SaveTarefa>(TarefaActions.SAVE_TAREFA),
                switchMap((action) => {
                    return this._tarefaService.save(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaActions.SaveTarefaSuccess(),
                            new SetSteps({steps: false}),
                            new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new TarefaActions.SaveTarefaFailed(err));
                        })
                    );
                })
            );

    /**
     * Save Tarefa Success
     */
    @Effect({dispatch: false})
    saveTarefaSuccess: any =
        this._actions
            .pipe(
                ofType<TarefaActions.SaveTarefaSuccess>(TarefaActions.SAVE_TAREFA_SUCCESS),
                tap(() => {
                    this._router.navigate(['/apps/processo/' + this.routerState.params.processoHandle + '/visualizar']).then();
                })
            );
}

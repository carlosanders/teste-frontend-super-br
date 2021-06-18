import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import * as TarefaCreateBlocoActions from '../actions/tarefa-create-bloco.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {CdkUtils} from "../../../../../../../../@cdk/utils";

@Injectable()
export class TarefaCreateBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe((routerState) => {
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
                ofType<TarefaCreateBlocoActions.SaveTarefa>(TarefaCreateBlocoActions.SAVE_TAREFA),
                mergeMap(action => this._tarefaService.save(action.payload).pipe(
                        mergeMap((response: Tarefa) => [
                            new TarefaCreateBlocoActions.SaveTarefaSuccess(action.payload),
                            new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                            new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Tarefa no processo ${action.payload.processo.NUPFormatado} criada com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            const payload = {
                                id: action.payload.processo.id,
                                errors: err
                            };
                            const erroString = CdkUtils.errorsToString(err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'tarefa',
                                content: `Houve erro ao criar tarefa no processo ${action.payload.processo.NUPFormatado}! ${erroString}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new TarefaCreateBlocoActions.SaveTarefaFailed(payload));
                        })
                    ))
            );

}

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';

import * as CompartilhamentoCreateActions from '../actions/compartilhamento-create.actions';

import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {compartilhamento as compartilhamentoSchema} from '@cdk/normalizr/compartilhamento.schema';
import {Compartilhamento} from '@cdk/models/compartilhamento.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class CompartilhamentoCreateEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _compartilhamentoService: CompartilhamentoService,
        private _store: Store<State>,
        private _router: Router
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
     * Save Compartilhamento
     * @type {Observable<any>}
     */
    @Effect()
    saveCompartilhamento: any =
        this._actions
            .pipe(
                ofType<CompartilhamentoCreateActions.SaveCompartilhamento>(CompartilhamentoCreateActions.SAVE_COMPARTILHAMENTO),
                mergeMap((action) => {
                    return this._compartilhamentoService.save(action.payload).pipe(
                        mergeMap((response: Compartilhamento) => [
                            new CompartilhamentoCreateActions.SaveCompartilhamentoSuccess(action.payload),
                            new AddData<Compartilhamento>({data: [response], schema: compartilhamentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'compartilhamento',
                                content: `Compartilhamento na tarefa id ${action.payload.tarefa.id} criado com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'compartilhamento',
                                content: `Houve erro no compartilhamento na tarefa id ${action.payload.tarefa.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new CompartilhamentoCreateActions.SaveCompartilhamentoFailed(action.payload));
                        })
                    );
                })
            );

}

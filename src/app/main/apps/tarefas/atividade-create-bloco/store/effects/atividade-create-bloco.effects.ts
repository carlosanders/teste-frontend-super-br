import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';

import * as AtividadeCreateBlocoActions from '../actions/atividade-create-bloco.actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr';
import {Atividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';
import {RemoveTarefa} from '../../../store';
import {AddProcessoEncaminhamento} from '../../../encaminhamento-bloco/store';

@Injectable()
export class AtividadeCreateBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
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
     * Save Atividade
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveAtividade: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateBlocoActions.SaveAtividade>(AtividadeCreateBlocoActions.SAVE_ATIVIDADE),
                mergeMap(action => this._atividadeService.save(action.payload).pipe(
                        mergeMap((response: Atividade) => [
                            new AtividadeCreateBlocoActions.SaveAtividadeSuccess(action.payload),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Atividade na tarefa id ${action.payload.tarefa.id} criado com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'atividade',
                                content: `Houve erro no atividade na tarefa id ${action.payload.tarefa.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new AtividadeCreateBlocoActions.SaveAtividadeFailed(action.payload));
                        })
                    ))
            );

    /**
     * Save Atividade Success
     */
    @Effect({ dispatch: false })
    saveAtividadeSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateBlocoActions.SaveAtividadeSuccess>(AtividadeCreateBlocoActions.SAVE_ATIVIDADE_SUCCESS),
                tap((action) => {
                    if (action.payload.encerraTarefa) {
                        this._store.dispatch(new AddProcessoEncaminhamento(action.payload.tarefa.processo.id));
                        this._store.dispatch(new RemoveTarefa(action.payload.tarefa.id));
                    }
                })
            );
}

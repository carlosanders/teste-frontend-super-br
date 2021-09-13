import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';

import {State} from 'app/store/reducers';
import * as TarefaActions from '../actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TarefaEffects {

    /**
     * Distribui tarefas do usuario
     *
     * @type {Observable<any>}
     */
    distribuirTarefasUsuario: any = createEffect(() => this._actions.pipe(
        ofType<TarefaActions.DistribuirTarefasUsuario>(TarefaActions.DISTRIBUIR_TAREFAS_USUARIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Distribuindo tarefas do usuário ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._tarefaService.distribuirTarefasUsuario(action.payload.usuario).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Tarefas do usuário distribuídas com sucesso.',
                status: 1, // sucesso
            }))),
            map(response => new TarefaActions.DistribuirTarefasUsuarioSuccess(response.id)),
            catchError((err) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao distribuir as tarefas do usuario.',
                    status: 2, // erro
                }));
                console.log(err);
                return of(new TarefaActions.DistribuirTarefasUsuarioSuccess(action.payload));
            })
        ))
    ));

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
}

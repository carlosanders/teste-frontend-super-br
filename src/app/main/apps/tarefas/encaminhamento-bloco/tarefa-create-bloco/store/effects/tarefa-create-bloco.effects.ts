import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as TarefaCreateBlocoActions from '../actions/tarefa-create-bloco.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TarefaCreateBlocoEffect {
    routerState: any;
    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    saveTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TarefaCreateBlocoActions.SaveTarefa>(TarefaCreateBlocoActions.SAVE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Salvando a tarefa ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tarefaService.save(action.payload.tarefa).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Tarefa id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Tarefa) => [
                new TarefaCreateBlocoActions.SaveTarefaSuccess(action.payload.tarefa),
                new AddData<Tarefa>({data: [response], schema: tarefaSchema})
            ]),
            catchError((err) => {
                const payload = {
                    id: action.payload.tarefa.processo.id,
                    errors: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Erro ao salvar a tarefa!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new TarefaCreateBlocoActions.SaveTarefaFailed(payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

}

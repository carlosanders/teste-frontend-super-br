import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as TarefaCreateActions from '../actions/tarefa-create.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class TarefaCreateEffect {
    routerState: any;
    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    saveTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefaCreateActions.SaveTarefa>(TarefaCreateActions.SAVE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Criando tarefa ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tarefaService.save(action.payload.tarefa).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: `Tarefa id ${response.id} criada com sucesso!`,
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Tarefa) => [
                new TarefaCreateActions.SaveTarefaSuccess(action.payload.tarefa.bloco),
                new AddData<Tarefa>({data: [response], schema: tarefaSchema})
            ]),
            catchError((err) => {
                console.log(err);
                const erroString = CdkUtils.errorsToString(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    // eslint-disable-next-line max-len
                    content: `Houve erro na criação de tarefa no processo ${action.payload.tarefa.processo.NUP} para o setor ${action.payload.tarefa.setorResponsavel.nome}! ${erroString}`,
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new TarefaCreateActions.SaveTarefaFailed(err));
            })
        ))
    ));
    /**
     * Save Tarefa Success
     */
    saveTarefaSuccess: any = createEffect(() => this._actions.pipe(
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
    ), {dispatch: false});

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

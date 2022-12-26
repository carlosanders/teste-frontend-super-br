import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as TarefaEditActions from '../actions/tarefa-edit.actions';
import * as TarefaListActions from '../../../tarefa-list/store/actions/tarefa-list.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class TarefaEditEffect {
    routerState: any;
    steps: any;
    /**
     * Get Tarefa with router parameters
     *
     * @type {Observable<any>}
     */
    getTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefaEditActions.GetTarefa>(TarefaEditActions.GET_TAREFA),
        switchMap(action => this._tarefaService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'processo',
                'processo.especieProcesso',
                'processo.especieProcesso.generoProcesso',
                'processo.modalidadeMeio',
                'processo.documentoAvulsoOrigem',
                'especieTarefa',
                'usuarioResponsavel',
                'usuarioResponsavel.colaborador',
                'setorResponsavel',
                'setorResponsavel.unidade',
                'setorOrigem',
                'setorOrigem.unidade',
                'especieTarefa.generoTarefa',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta',
                'vinculacaoWorkflow',
                'vinculacaoWorkflow.workflow',
            ]),
            JSON.stringify({'especieProcessoWorkflow': true})
        )),
        switchMap(response => [
            new AddData<Tarefa>({data: response['entities'], schema: tarefaSchema}),
            new TarefaEditActions.GetTarefaSuccess({
                loaded: {
                    id: 'tarefaHandle',
                    value: this.routerState.params.tarefaHandle
                },
                tarefaId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new TarefaEditActions.GetTarefaFailed(err));
        })
    ));
    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    saveTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefaEditActions.SaveTarefa>(TarefaEditActions.SAVE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Salvando a tarefa ...',
            status: 0, // carregando
        }))),
        mergeMap(action => this._tarefaService.save(action.payload.tarefa).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tarefa',
                content: 'Tarefa id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Tarefa) => [
                new TarefaEditActions.SaveTarefaSuccess(),
                new TarefaListActions.ReloadTarefas(),
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
                return of(new TarefaEditActions.SaveTarefaFailed(err));
            })
        ))
    ));
    /**
     * Save Tarefa Success
     */
    saveTarefaSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TarefaEditActions.SaveTarefaSuccess>(TarefaEditActions.SAVE_TAREFA_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.tarefaHandle), 'listar')]).then();
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

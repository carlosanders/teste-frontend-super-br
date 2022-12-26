import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as RedistribuicaoEditBlocoActions from '../actions/redistribuicao-edit-bloco.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {RemoveTarefa} from '../../../store';

@Injectable()
export class TarefaEditBlocoEffect {
    routerState: any;
    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    saveTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RedistribuicaoEditBlocoActions.SaveTarefa>(RedistribuicaoEditBlocoActions.SAVE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Redistribuindo a tarefa ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap((action) => {
            const populate = JSON.stringify([
                'processo',
                'colaborador.usuario',
                'setor.especieSetor',
                'setor.generoSetor',
                'setor.parent',
                'setor.unidade',
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
                'workflow'
            ]);
            return this._tarefaService.save(action.payload.tarefa, JSON.stringify({'especieProcessoWorkflow': true}), populate).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: 'Tarefa id ' + response.id + ' redistribuída com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }))),
                mergeMap((response: Tarefa) => [
                    new RedistribuicaoEditBlocoActions.SaveTarefaSuccess(response),
                    new AddData<Tarefa>({data: [response], schema: tarefaSchema}),
                    new RemoveTarefa(action.payload.tarefa.id)
                ]),
                catchError((err) => {
                    const payload = {
                        id: action.payload.tarefa.id,
                        errors: err
                    };
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        content: 'Erro ao redistribuir a tarefa!',
                        status: 2, // erro
                        lote: action.payload.loteId
                    }));
                    return of(new RedistribuicaoEditBlocoActions.SaveTarefaFailed(payload));
                })
            );
        })
    ));

    constructor(
        private _actions: Actions,
        private _tarefaService: TarefaService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}

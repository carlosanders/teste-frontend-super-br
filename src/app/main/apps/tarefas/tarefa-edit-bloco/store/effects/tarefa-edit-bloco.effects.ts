import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as TarefaEditBlocoActions from '../actions/tarefa-edit-bloco.actions';

import {TarefaService} from '@cdk/services/tarefa.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class TarefaEditBlocoEffect {
    routerState: any;
    /**
     * Save Tarefa
     *
     * @type {Observable<any>}
     */
    saveTarefa: any = createEffect(() => this._actions.pipe(
        ofType<TarefaEditBlocoActions.SaveTarefa>(TarefaEditBlocoActions.SAVE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tarefa',
            content: 'Editando a tarefa id ' + action.payload.tarefa.id + ' ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap((action) => {
            const populate = [
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
                'vinculacaoWorkflow',
                'vinculacaoWorkflow.workflow',
            ];
            const context = JSON.stringify({'especieProcessoWorkflow': true});
            return this._tarefaService.patch(action.payload.tarefa, action.payload.changes, JSON.stringify(populate), context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tarefa',
                    content: `Tarefa id ${response.id} editada com sucesso!`,
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }))),
                mergeMap((response: Tarefa) => [
                    new TarefaEditBlocoActions.SaveTarefaSuccess(action.payload),
                    new AddData<Tarefa>({data: [response], schema: tarefaSchema, populate})
                ]),
                catchError((err) => {
                    const payload = {
                        id: action.payload.tarefa.id,
                        errors: err
                    };
                    console.log(err);
                    const erroString = CdkUtils.errorsToString(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'tarefa',
                        // eslint-disable-next-line max-len
                        content: `Houve erro na alteração da tarefa id ${action.payload.tarefa.id}! ${erroString}`,
                        status: 2, // erro
                        lote: action.payload.loteId
                    }));
                    return of(new TarefaEditBlocoActions.SaveTarefaFailed(payload));
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

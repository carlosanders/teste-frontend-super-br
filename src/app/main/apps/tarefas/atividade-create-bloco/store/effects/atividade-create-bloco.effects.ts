import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {concatMap, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as AtividadeCreateBlocoActions from '../actions/atividade-create-bloco.actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr';
import {Atividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {RemoveTarefa} from '../../../store';
import {AddProcessoEncaminhamento} from '../../../encaminhamento-bloco/store';
import {RemoveMinutasTarefa} from '../actions';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class AtividadeCreateBlocoEffect {
    routerState: any;
    /**
     * Save Atividade
     *
     * @type {Observable<any>}
     */
    saveAtividade: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateBlocoActions.SaveAtividade>(AtividadeCreateBlocoActions.SAVE_ATIVIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'atividade',
            content: 'Salvando a atividade ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._atividadeService.save(action.payload.atividade, '{}', JSON.stringify(['tarefa', 'tarefa.vinculacaoWorkflow', 'tarefa.processo'])).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'atividade',
                content: 'Atividade id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Atividade) => [
                new RemoveMinutasTarefa({
                    documentos: action.payload.atividade.documentos,
                    tarefaId: action.payload.atividade.tarefa.id
                }),
                new AtividadeCreateBlocoActions.SaveAtividadeSuccess(action.payload.atividade),
                new AddData<Atividade>({data: [response], schema: atividadeSchema})
            ]),
            catchError((err) => {
                const payload = {
                    tarefaId: action.payload.atividade.tarefa?.id,
                    errors: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'atividade',
                    content: 'Erro ao salvar a atividade!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new AtividadeCreateBlocoActions.SaveAtividadeFailed(payload));
            })
        ))
    ));
    /**
     * Save Atividade Success
     */
    saveAtividadeSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateBlocoActions.SaveAtividadeSuccess>(AtividadeCreateBlocoActions.SAVE_ATIVIDADE_SUCCESS),
        tap((action) => {
            if (action.payload.encerraTarefa) {
                this._store.dispatch(new AddProcessoEncaminhamento(action.payload.tarefa.processo.id));
                this._store.dispatch(new RemoveTarefa(action.payload.tarefa.id));
            }
        })
    ), {dispatch: false});
    /**
     * Save Atividades Lineares
     */
    saveAtividadeLineares: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateBlocoActions.SaveAtividadesLineares>(AtividadeCreateBlocoActions.SAVE_ATIVIDADES_LINEARES),
        tap((action) => {
            action.payload.atividadesLineares.forEach((atividade) => {
                this._store.dispatch(new AtividadeCreateBlocoActions.SaveAtividadeLinear({
                    atividade: atividade,
                    operacaoId: CdkUtils.makeId(),
                    loteId: action.payload.loteId
                }));
            })
        })
    ), {dispatch: false});
    /**
     * Save Atividade Linear
     *
     * @type {Observable<any>}
     */
    saveAtividadeLinear: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateBlocoActions.SaveAtividadeLinear>(AtividadeCreateBlocoActions.SAVE_ATIVIDADE_LINEAR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'atividade',
            content: 'Salvando a atividade ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        concatMap(action => this._atividadeService.save(action.payload.atividade, '{}', JSON.stringify(['tarefa', 'tarefa.vinculacaoWorkflow', 'tarefa.processo'])).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'atividade',
                content: 'Atividade id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Atividade) => [
                new RemoveMinutasTarefa({
                    documentos: action.payload.atividade.documentos,
                    tarefaId: action.payload.atividade.tarefa.id
                }),
                new AtividadeCreateBlocoActions.SaveAtividadeLinearSuccess(action.payload.atividade),
                new AddData<Atividade>({data: [response], schema: atividadeSchema})
            ]),
            catchError((err) => {
                const payload = {
                    tarefaId: action.payload.atividade.tarefa?.id,
                    errors: err
                };
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'atividade',
                    content: 'Erro ao salvar a atividade!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new AtividadeCreateBlocoActions.SaveAtividadeLinearFailed(payload));
            })
        ))
    ));
    /**
     * Save Atividade Linear Success
     */
    saveAtividadeLinearSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AtividadeCreateBlocoActions.SaveAtividadeLinearSuccess>(AtividadeCreateBlocoActions.SAVE_ATIVIDADE_LINEAR_SUCCESS),
        tap((action) => {
            if (action.payload.encerraTarefa) {
                this._store.dispatch(new AddProcessoEncaminhamento(action.payload.tarefa.processo.id));
                this._store.dispatch(new RemoveTarefa(action.payload.tarefa.id));
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
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

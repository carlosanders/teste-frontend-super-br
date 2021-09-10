import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
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
        }))),
        mergeMap(action => this._atividadeService.save(action.payload.atividade).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'atividade',
                content: 'Atividade id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Atividade) => [
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

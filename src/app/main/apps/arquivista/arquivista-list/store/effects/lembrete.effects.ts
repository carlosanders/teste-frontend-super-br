import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {State} from '../../../../../../store';
import {Router} from '@angular/router';
import * as LembreteActions from '../actions/lembrete.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AddData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {of} from 'rxjs';
import {ProcessoService} from '@cdk/services/processo.service';

@Injectable()
export class LembreteEffects {
    /**
     * Save Lembrete
     *
     * @type {any}
     */
    saveLembrete: any = createEffect(() => this._actions.pipe(
        ofType<LembreteActions.SaveLembrete>(LembreteActions.SAVE_LEMBRETE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'lembrete',
            content: 'Salvando lembrete para processo id ' + action.payload.processo.id + ' ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._processoService.patch(action.payload.processo, {lembreteArquivista: action.payload.conteudo}).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'lembrete',
                content: 'Lembrete do processo id ' + action.payload.processo.id + ' atualizado com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Processo) => [
                new LembreteActions.SaveLembreteSuccess(),
                new AddData<Processo>({data: [response], schema: processoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'lembrete',
                    content: 'Erro ao alterar lembrete do processo id ' + action.payload.processo.id + '.',
                    status: 2, // Erro
                }));
                return of(new LembreteActions.SaveLembreteFailed(err));
            })
        ))
    ));
    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _router: Router
    ) {
    }
}

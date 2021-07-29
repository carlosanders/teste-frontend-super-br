import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AtividadeCreateActions from '../actions/atividade-create.actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr';
import {Atividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {RemoveTarefa} from '../../../../../store/actions';

@Injectable()
export class AtividadeCreateEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _atividadeService: AtividadeService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
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
                ofType<AtividadeCreateActions.SaveAtividade>(AtividadeCreateActions.SAVE_ATIVIDADE),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'atividade',
                    content: 'Salvando a atividade ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._atividadeService.save(action.payload.atividade).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'atividade',
                                content: 'Atividade id ' + response.id + ' salva com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Atividade) => [
                            new AtividadeCreateActions.SaveAtividadeSuccess(response),
                            new AddData<Atividade>({data: [response], schema: atividadeSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'atividade',
                                content: 'Erro ao salvar a atividade!',
                                status: 2, // erro
                            }));
                            return of(new AtividadeCreateActions.SaveAtividadeFailed(err));
                        })
                    )
                })
            );

    /**
     * Save Atividade Success
     */
    @Effect({ dispatch: false })
    saveAtividadeSuccess: any =
        this._actions
            .pipe(
                ofType<AtividadeCreateActions.SaveAtividadeSuccess>(AtividadeCreateActions.SAVE_ATIVIDADE_SUCCESS),
                tap((action) => {
                    if (action.payload.encerraTarefa) {
                        this._store.dispatch(new RemoveTarefa(action.payload.tarefa.id));
                        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/encaminhamento']).then();
                    } else {
                        // Não foi encerrada a tarefa, encaminha pra visão do processo
                        // tslint:disable-next-line:max-line-length
                        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/processo/' + action.payload.tarefa.processo.id + '/visualizar/default']).then();
                    }
                })
            );

}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap} from 'rxjs/operators';

import * as AtividadeCreateBlocoActions from '../actions/upload-bloco.actions';

import {AtividadeService} from '@cdk/services/atividade.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {atividade as atividadeSchema} from '@cdk/normalizr';
import {Atividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
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
            content: 'Criando atividade na tarefa id ' + action.payload.atividade.tarefa.id + ' ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._atividadeService.save(action.payload.atividade).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'atividade',
                content: `Atividade na tarefa id ${action.payload.atividade.tarefa.id} criado com sucesso!`,
                success: true,
                status: 1, // sucesso
                lote: action.payload.loteId
            }))),
            mergeMap((response: Atividade) => [
                new AtividadeCreateBlocoActions.SaveAtividadeSuccess(action.payload.atividade),
                new AddData<Atividade>({data: [response], schema: atividadeSchema}),
            ]),
            catchError((err) => {
                console.log(err);
                const erroString = CdkUtils.errorsToString(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'atividade',
                    content: `Houve erro no atividade na tarefa id ${action.payload.atividade.tarefa.id}! ${erroString}`,
                    success: false,
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                return of(new AtividadeCreateBlocoActions.SaveAtividadeFailed(action.payload.atividade));
            })
        ))
    ));

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

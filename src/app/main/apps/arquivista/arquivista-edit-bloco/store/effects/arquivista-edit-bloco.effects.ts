import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import * as ArquivistaEditBlocoActions from '../actions/arquivista-edit-bloco.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from '@cdk/utils';
import * as moment from 'moment';
import {
    ChangeProcessos,
    ChangeSelectedProcessos,
    getProcessosIds,
    getSelectedProcessoIds
} from '../../../arquivista-list/store';

@Injectable()
export class ArquivistaEditBlocoEffects {
    routerState: any;
    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    saveProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ArquivistaEditBlocoActions.SaveProcesso>(ArquivistaEditBlocoActions.SAVE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'arquivista',
            content: 'Salvando a transição do processo...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo,
            undo: null
        }))),
        mergeMap(action => this._processoService.patch(action.payload.processo, action.payload.changes).pipe(
            mergeMap((response: Processo) => [
                new ArquivistaEditBlocoActions.SaveProcessoSuccess(action.payload),
                new UpdateData<Processo>({
                    id: response.id,
                    schema: processoSchema,
                    changes: {
                        classificacao: response.classificacao,
                        lembreteArquivista: response.lembreteArquivista,
                        dataHoraProximaTransicao: response.dataHoraProximaTransicao
                    }
                }),
                new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'arquivista',
                    content: `Processo id ${action.payload.processo.id} editado com sucesso!`,
                    status: 1, // sucesso
                    success: true,
                    lote: action.payload.loteId,
                    redo: 'inherent'
                })
            ]),
            catchError((err) => {
                const payload = {
                    id: action.payload.processo.id,
                    error: err
                };
                console.log(err);
                const erroString = CdkUtils.errorsToString(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'arquivista',
                    content: `Houve erro na edição do processo id ${action.payload.processo.id}! ${erroString}`,
                    status: 2, // erro
                    success: false,
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
                return of(new ArquivistaEditBlocoActions.SaveProcessoFailed(payload));
            })
        ), 25)
    ));
    saveProcessoSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ArquivistaEditBlocoActions.SaveProcessoSuccess>(ArquivistaEditBlocoActions.SAVE_PROCESSO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getSelectedProcessoIds)), this._store.pipe(select(getProcessosIds))),
        tap(([action, selectedIds, entitiesId]) => {
            const currentDate = moment();
            let typeHandle = this.routerState.params['typeHandle'];
            const dataHora = !!action.payload.changes.dataHoraProximaTransicao;
            if (dataHora && action.payload.changes.dataHoraProximaTransicao === null) {
                typeHandle = 'pendencia-analise';
            } else if (dataHora && action.payload.changes.dataHoraProximaTransicao > currentDate) {
                typeHandle = 'aguardando-decurso';
            } else if (dataHora && action.payload.changes.dataHoraProximaTransicao <= currentDate) {
                typeHandle = 'pronto-transicao';
            }
            const newSelectedProcessos = selectedIds.filter(id => id !== action.payload.processo.id);
            this._store.dispatch(new ChangeSelectedProcessos(newSelectedProcessos, false));
            if (typeHandle !== this.routerState.params['typeHandle']) {
                const newEntitiesId = entitiesId.filter(id => id !== action.payload.processo.id);
                this._store.dispatch(new ChangeProcessos(newEntitiesId));
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
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

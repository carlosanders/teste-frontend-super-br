import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {buffer, catchError, filter, map, mergeAll, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from '../../../../../auth/login/login.service';
import {TransicaoService} from '@cdk/services/transicao.service';

import {UpdateData} from '@cdk/ngrx-normalizr';
import * as TransicaoArquivistaBloco from '../actions/transicao-arquivista-bloco.actions';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../../store';
import {getRouterState, State} from '../../../../../../store';
import {
    ChangeProcessos,
    ChangeSelectedProcessos,
    getProcessosIds,
    getSelectedProcessoIds
} from '../../../arquivista-list/store';
import {CdkUtils} from '@cdk/utils';

@Injectable()
export class TransicaoArquivistaBlocoEffects {
    routerState: any;
    /**
     * Save TransicaoArquivista
     *
     * @type {Observable<any>}
     */
    saveTransicaoArquivista: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TransicaoArquivistaBloco.SaveTransicaoArquivista>(TransicaoArquivistaBloco.SAVE_TRANSICAO_ARQUIVISTA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'temporalidade e destinação',
            content: 'Realizando ' + action.payload.transicao.modalidadeTransicao.valor.toLowerCase() +
                ' do processo id ' + action.payload.transicao.processo.id + '...',
            status: 0, // carregando
            lote: action.payload.loteId,
            redo: action.payload.redo
        }))),
        buffer(this._store.pipe(select(fromStore.getBufferingTransicao))),
        mergeAll(),
        withLatestFrom(this._store.pipe(select(fromStore.getTransicaoProcessoIds))),
        mergeMap(([action, transicaoProcessoIds]) => {
            if (transicaoProcessoIds.indexOf(action.payload.transicao.processo.id) === -1) {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'temporalidade e destinação',
                    content: 'Operação de ' + action.payload.transicao.modalidadeTransicao.valor.toLowerCase() +
                        ' do processo id ' + action.payload.transicao.processo.id + ' foi cancelada.',
                    success: false,
                    status: 3, // cancelada
                    lote: action.payload.loteId,
                    redo: 'inherent'
                }));
                return of(new TransicaoArquivistaBloco.SaveTransicaoArquivistaCancelSuccess(action.payload.transicao.processo.id));
            }
            return this._transicaoService.save(action.payload.transicao).pipe(
                map(() => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'temporalidade e destinação',
                        content: 'Operação de ' + action.payload.transicao.modalidadeTransicao.valor.toLowerCase() +
                            ' do processo id ' + action.payload.transicao.processo.id + ' realizada com sucesso.',
                        status: 1, // sucesso
                        success: true,
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    this._store.dispatch(new fromStore.GetProcesso(action.payload.transicao.processo));
                    return new TransicaoArquivistaBloco.SaveTransicaoArquivistaSuccess(action.payload.transicao.processo.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.transicao.processo.id,
                        error: err
                    };
                    const erroString = CdkUtils.errorsToString(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'temporalidade e destinação',
                        content: `Erro ao realizar ${action.payload.transicao.modalidadeTransicao.valor.toLowerCase()} do processo id ` +
                            action.payload.transicao.processo.id + `! ${erroString}`,
                        status: 2, // erro
                        success: false,
                        lote: action.payload.loteId,
                        redo: 'inherent'
                    }));
                    console.log(err);
                    return of(new TransicaoArquivistaBloco.SaveTransicaoArquivistaFailed(payload));
                })
            );
        }, 25)
    ));
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TransicaoArquivistaBloco.GetProcesso>(TransicaoArquivistaBloco.GET_PROCESSO),
        mergeMap((action) => {
            const populate = JSON.stringify([
                'classificacao',
                'modalidadeFase',
                'classificacao.modalidadeDestinacao'
            ]);
            return this._processoService.get(action.payload.id, populate).pipe(
                map((response) => {
                    this._store.dispatch(new UpdateData<Processo>(
                        {
                            id: response.id,
                            schema: processoSchema,
                            changes: {
                                modalidadeFase: response.modalidadeFase,
                                dataHoraProximaTransicao: response.dataHoraProximaTransicao
                            }
                        }
                    ));
                    return new TransicaoArquivistaBloco.GetProcessoSuccess(response);
                }),
                catchError((err) => {
                    console.log(err);
                    return of(new TransicaoArquivistaBloco.GetProcessoFailed(err));
                })
            );
        }, 25)
    ));
    /**
     * Get Processo Success
     */
    getProcessoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<TransicaoArquivistaBloco.GetProcessoSuccess>(TransicaoArquivistaBloco.GET_PROCESSO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getSelectedProcessoIds)), this._store.pipe(select(getProcessosIds))),
        tap(([action, selectedIds, entitiesId]) => {
            const currentDate = moment();
            let typeHandle = this.routerState.params['typeHandle'];
            if (!action.payload.dataHoraProximaTransicao) {
                typeHandle = 'pendencia-analise';
            } else if (action.payload.dataHoraProximaTransicao > currentDate) {
                typeHandle = 'aguardando-decurso';
            } else if (action.payload.dataHoraProximaTransicao <= currentDate) {
                if (action.payload.modalidadeFase.valor === 'CORRENTE') {
                    typeHandle = 'pronto-transferencia';
                }
                if (action.payload.modalidadeFase.valor === 'INTERMEDIÁRIA' && action.payload.classificacao.modalidadeDestinacao.valor === 'ELIMINAÇÃO') {
                    typeHandle = 'pronto-eliminação';
                }
                if (action.payload.modalidadeFase.valor === 'INTERMEDIÁRIA' && action.payload.classificacao.modalidadeDestinacao.valor === 'RECOLHIMENTO') {
                    typeHandle = 'pronto-recolhimento';
                }
            }
            const newSelectedProcessos = selectedIds.filter(id => id !== action.payload.id);
            this._store.dispatch(new ChangeSelectedProcessos(newSelectedProcessos, false));
            if (typeHandle !== this.routerState.params['typeHandle']) {
                const newEntitiesId = entitiesId.filter(id => id !== action.payload.id);
                this._store.dispatch(new ChangeProcessos(newEntitiesId));
            }
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _transicaoService: TransicaoService,
        private _loginService: LoginService,
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


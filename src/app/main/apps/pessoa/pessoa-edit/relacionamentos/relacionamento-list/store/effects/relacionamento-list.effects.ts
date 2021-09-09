import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RelacionamentoListActions from '../actions';

import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {RelacionamentoPessoal} from '@cdk/models';
import {relacionamentoPessoal as relacionamentoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class RelacionamentoListEffect {
    routerState: any;
    /**
     * Get Relacionamentos with router parameters
     *
     * @type {Observable<any>}
     */
    getRelacionamentos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RelacionamentoListActions.GetRelacionamentos>(RelacionamentoListActions.GET_RELACIONAMENTOS),
        switchMap(action => this._relacionamentoPessoalService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify([
                'populateAll'
            ]))),
        mergeMap(response => [
            new AddData<RelacionamentoPessoal>({data: response['entities'], schema: relacionamentoSchema}),
            new RelacionamentoListActions.GetRelacionamentosSuccess({
                entitiesId: response['entities'].map(relacionamento => relacionamento.id),
                loaded: {
                    id: 'pessoaHandle',
                    value: this.routerState.params.pessoaHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RelacionamentoListActions.GetRelacionamentosFailed(err));
        })
    ));
    /**
     * Delete Relacionamento
     *
     * @type {Observable<any>}
     */
    deleteRelacionamento: Observable<RelacionamentoListActions.RelacionamentoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RelacionamentoListActions.DeleteRelacionamento>(RelacionamentoListActions.DELETE_RELACIONAMENTO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'relacionamento',
            content: 'Apagando o relacionamento id ' + action.payload.relacionamentoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._relacionamentoPessoalService.destroy(action.payload.relacionamentoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relacionamento',
                    content: 'Relacionamento id ' + action.payload.relacionamentoId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<RelacionamentoPessoal>({
                    id: response.id,
                    schema: relacionamentoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RelacionamentoListActions.DeleteRelacionamentoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.relacionamentoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'relacionamento',
                    content: 'Erro ao apagar o relacionamento id ' + action.payload.relacionamentoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RelacionamentoListActions.DeleteRelacionamentoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _relacionamentoPessoalService: RelacionamentoPessoalService,
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

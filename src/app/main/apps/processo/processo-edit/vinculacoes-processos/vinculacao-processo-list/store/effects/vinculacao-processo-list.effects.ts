import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoProcessoListActions from '../actions';

import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VinculacaoProcessoListEffect {
    routerState: any;
    /**
     * Get VinculacoesProcessos with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacoesProcessos: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoProcessoListActions.GetVinculacoesProcessos>(VinculacaoProcessoListActions.GET_VINCULACOES_PROCESSOS),
        switchMap(action => this._vinculacaoProcessoService.findAllVinculacoes(
            action.payload.processoId,
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)
        )),
        mergeMap(response => [
            new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
            new VinculacaoProcessoListActions.GetVinculacoesProcessosSuccess({
                entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VinculacaoProcessoListActions.GetVinculacoesProcessosFailed(err));
        })
    ));
    /**
     * Delete VinculacaoProcesso
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoProcesso: Observable<VinculacaoProcessoListActions.VinculacaoProcessoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoProcessoListActions.DeleteVinculacaoProcesso>(VinculacaoProcessoListActions.DELETE_VINCULACAO_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'vinculação processo',
                content: 'Apagando a vinculação processo id ' + action.payload.vinculacaoProcessoId + '...',
                status: 0, // carregando
                lote: action.payload.loteId
            }))),
        mergeMap(action => this._vinculacaoProcessoService.destroy(action.payload.vinculacaoProcessoId).pipe(
                map((response) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação processo',
                        content: 'Vinculação processo id ' + action.payload.vinculacaoProcessoId + ' deletada com sucesso.',
                        status: 1, // sucesso
                        lote: action.payload.loteId
                    }));
                    this._store.dispatch(new UpdateData<VinculacaoProcesso>({
                        id: response.id,
                        schema: vinculacaoProcessoSchema,
                        changes: {apagadoEm: response.apagadoEm}
                    }));
                    return new VinculacaoProcessoListActions.DeleteVinculacaoProcessoSuccess(response.id);
                }),
                catchError((err) => {
                    const payload = {
                        id: action.payload.vinculacaoProcessoId,
                        error: err
                    };
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculação processo',
                        content: 'Erro ao apagar a vinculação processo id ' + action.payload.vinculacaoProcessoId + '!',
                        status: 2, // erro
                        lote: action.payload.loteId
                    }));
                    console.log(err);
                    return of(new VinculacaoProcessoListActions.DeleteVinculacaoProcessoFailed(payload));
                })
            ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
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

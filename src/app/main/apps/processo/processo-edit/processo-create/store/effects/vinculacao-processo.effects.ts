import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as VinculacoesProcessosActions from '../actions/vinculacao-processo.actions';

import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {getVinculacoesProcessosPagination} from '../selectors';

@Injectable()
export class VinculacaoProcessoEffects {
    routerState: any;
    /**
     * Get VinculacoesProcessos Processo
     *
     * @type {Observable<any>}
     */
    getVinculacoesProcessosProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacoesProcessosActions.GetVinculacoesProcessos>(VinculacoesProcessosActions.GET_VINCULACOES_PROCESSOS),
        switchMap(action => this._vinculacaoProcessoService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.listFilter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate))),
        mergeMap(response => [
            new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
            new VinculacoesProcessosActions.GetVinculacoesProcessosSuccess({
                entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle,
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VinculacoesProcessosActions.GetVinculacoesProcessosFailed(err));
        })
    ));
    /**
     * Save VinculacaoProcesso
     *
     * @type {Observable<any>}
     */
    saveVinculacaoProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VinculacoesProcessosActions.SaveVinculacaoProcesso>(VinculacoesProcessosActions.SAVE_VINCULACAO_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação do processo',
            content: 'Salvando a vinculação do processo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoProcessoService.save(action.payload.vinculacaoProcesso).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'vinculação do processo',
                content: 'Vinculação do processo id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: VinculacaoProcesso) => [
                new VinculacoesProcessosActions.SaveVinculacaoProcessoSuccess(),
                new AddData<VinculacaoProcesso>({data: [response], schema: vinculacaoProcessoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação do processo',
                    content: 'Erro ao salvar a vinculação do processo!',
                    status: 2, // erro
                }));
                return of(new VinculacoesProcessosActions.SaveVinculacaoProcessoFailed(err));
            })
        ))
    ));
    /**
     * Save VinculacaoProcesso Success
     *
     * @type {Observable<any>}
     */
    saveVinculacoesProcessosSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VinculacoesProcessosActions.SaveVinculacaoProcessoSuccess>(VinculacoesProcessosActions.SAVE_VINCULACAO_PROCESSO_SUCCESS),
        withLatestFrom(this._store.pipe(select(getVinculacoesProcessosPagination))),
        tap(([, pagination]) => {
            this._store.dispatch(new VinculacoesProcessosActions.GetVinculacoesProcessos(pagination));
        }),
    ), {dispatch: false});
    /**
     * Delete VinculacaoProcesso
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoProcesso: Observable<VinculacoesProcessosActions.VinculacaoProcessoActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VinculacoesProcessosActions.DeleteVinculacaoProcesso>(VinculacoesProcessosActions.DELETE_VINCULACAO_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculação do processo',
            content: 'Apagando a vinculação de processo id ' + action.payload.vinculacaoProcessoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoProcessoService.destroy(action.payload.vinculacaoProcessoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação do processo',
                    content: 'Vinculação de processo id ' + action.payload.vinculacaoProcessoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<VinculacaoProcesso>({
                    id: response.id,
                    schema: vinculacaoProcessoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new VinculacoesProcessosActions.DeleteVinculacaoProcessoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoProcessoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculação do processo',
                    content: 'Erro ao apagar a vinculação do processo id ' + action.payload.vinculacaoProcessoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new VinculacoesProcessosActions.DeleteVinculacaoProcessoFailed(payload));
            })
        ), 25)
    ));

    /**
     *
     * @param _actions
     * @param _vinculacaoProcessoService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
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

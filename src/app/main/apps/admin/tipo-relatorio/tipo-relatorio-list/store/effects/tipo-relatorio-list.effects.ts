import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as TipoRelatorioListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class TipoRelatorioListEffects {
    routerState: any;
    /**
     * Get TipoRelatorio with router parameters
     *
     * @type {Observable<any>}
     */
    getTipoRelatorio: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<TipoRelatorioListActions.GetTipoRelatorio>(TipoRelatorioListActions.GET_TIPO_RELATORIO),
        switchMap(action => this._tipoRelatorioService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<TipoRelatorio>({data: response['entities'], schema: tipoRelatorioSchema}),
                new TipoRelatorioListActions.GetTipoRelatorioSuccess({
                    entitiesId: response['entities'].map(tipoRelatorio => tipoRelatorio.id),
                    loaded: {
                        id: 'tipoRelatorioHandle',
                        value: this.routerState.params.tipoRelatorioHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new TipoRelatorioListActions.GetTipoRelatorioFailed(err));
            })
        ))
    ));
    /**
     * Delete TipoRelatorio
     *
     * @type {Observable<any>}
     */
    deleteTipoRelatorio: Observable<TipoRelatorioListActions.TipoRelatorioListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<TipoRelatorioListActions.DeleteTipoRelatorio>(TipoRelatorioListActions.DELETE_TIPO_RELATORIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tipo de relatório',
            content: 'Apagando o tipo de relatório id ' + action.payload.tipoRelatorioId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tipoRelatorioService.destroy(action.payload.tipoRelatorioId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo de relatório',
                    content: 'Tipo de relatório id ' + action.payload.tipoRelatorioId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<TipoRelatorio>({
                    id: response.id,
                    schema: tipoRelatorioSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new TipoRelatorioListActions.DeleteTipoRelatorioSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.tipoRelatorioId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tipo de relatório',
                    content: 'Erro ao apagar o tipo de relatório id ' + action.payload.tipoRelatorioId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new TipoRelatorioListActions.DeleteTipoRelatorioFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _tipoRelatorioService: TipoRelatorioService,
        private _loginService: LoginService,
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

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VisibilidadeListActions from '../actions';

import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VisibilidadeListEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _tipoRelatorioService: TipoRelatorioService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    /**
     * Get Visibilidades with router parameters
     *
     * @type {Observable<any>}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    getVisibilidades: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisibilidadeListActions.GetVisibilidades>(VisibilidadeListActions.GET_TIPO_RELATORIO_VISIBILIDADES),
        switchMap(action => this._tipoRelatorioService.getVisibilidade(
            action.payload)),
        mergeMap(response => [
            new AddData<Visibilidade>({data: response, schema: visibilidadeSchema}),
            new VisibilidadeListActions.GetVisibilidadesSuccess({
                entitiesId: response.map(visibilidade => visibilidade.id),
                loaded: {
                    id: 'tipoRelatorioHandle',
                    value: this.routerState.params.tipoRelatorioHandle
                },
                total: response['total']
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VisibilidadeListActions.GetVisibilidadesFailed(err));
        })
    ));
    /**
     * Delete Visibilidade
     *
     * @type {Observable<any>}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    deleteVisibilidade: Observable<VisibilidadeListActions.VisibilidadeListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VisibilidadeListActions.DeleteVisibilidade>(VisibilidadeListActions.DELETE_TIPO_RELATORIO_VISIBILIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'visibilidade',
            content: 'Apagando a visibilidade id ' + action.payload.visibilidadeId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._tipoRelatorioService.destroyVisibilidade(action.payload.tipoRelatorioId, action.payload.visibilidadeId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'visibilidade',
                    content: 'Visibilidade id ' + action.payload.visibilidadeId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                return new VisibilidadeListActions.DeleteVisibilidadeSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.visibilidadeId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'visibilidade',
                    content: 'Erro ao apagar a visibilidade id ' + action.payload.visibilidadeId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new VisibilidadeListActions.DeleteVisibilidadeFailed(payload));
            })
        ), 25)
    ));
}

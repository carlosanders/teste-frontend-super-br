import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VisibilidadeListActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VisibilidadeListEffect {
    routerState: any;
    /**
     * Get Visibilidades with router parameters
     *
     * @type {Observable<any>}
     */
    getVisibilidades: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<VisibilidadeListActions.GetVisibilidades>(VisibilidadeListActions.GET_VISIBILIDADES),
        switchMap(action => this._processoService.getVisibilidade(
            action.payload)),
        mergeMap(response => [
            new AddData<Visibilidade>({data: response, schema: visibilidadeSchema}),
            new VisibilidadeListActions.GetVisibilidadesSuccess({
                entitiesId: response.map(visibilidade => visibilidade.id),
                loaded: {
                    id: 'processoHandle',
                    value: this.routerState.params.processoHandle
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
    deleteVisibilidade: Observable<VisibilidadeListActions.VisibilidadeListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VisibilidadeListActions.DeleteVisibilidade>(VisibilidadeListActions.DELETE_VISIBILIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'visibilidade',
            content: 'Apagando a visibilidade id ' + action.payload.visibilidadeId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._processoService.destroyVisibilidade(action.payload.processoId, action.payload.visibilidadeId).pipe(
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

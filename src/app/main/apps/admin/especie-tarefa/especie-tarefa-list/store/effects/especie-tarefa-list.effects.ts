import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from '../../../../../../../store';
import * as EspecieTarefaListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {EspecieTarefa} from '@cdk/models';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class EspecieTarefaListEffects {
    routerState: any;
    /**
     * Get EspecieTarefa with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieTarefa: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<EspecieTarefaListActions.GetEspecieTarefa>(EspecieTarefaListActions.GET_ESPECIE_TAREFA),
        switchMap(action => this._especieTarefaService.query(
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
                new AddData<EspecieTarefa>({data: response['entities'], schema: especieTarefaSchema}),
                new EspecieTarefaListActions.GetEspecieTarefaSuccess({
                    entitiesId: response['entities'].map(especieTarefa => especieTarefa.id),
                    loaded: {
                        id: 'especieTarefaHandle',
                        value: this.routerState.params.especieTarefaHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new EspecieTarefaListActions.GetEspecieTarefaFailed(err));
            })
        ))
    ));
    /**
     * Delete EspecieTarefa
     *
     * @type {Observable<any>}
     */
    deleteEspecieTarefa: Observable<EspecieTarefaListActions.EspecieTarefaListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<EspecieTarefaListActions.DeleteEspecieTarefa>(EspecieTarefaListActions.DELETE_ESPECIE_TAREFA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie tarefa',
            content: 'Apagando a espécie tarefa id ' + action.payload.especieTarefaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._especieTarefaService.destroy(action.payload.especieTarefaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie tarefa',
                    content: 'Espécie Tarefa id ' + action.payload.especieTarefaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<EspecieTarefa>({
                    id: response.id,
                    schema: especieTarefaSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new EspecieTarefaListActions.DeleteEspecieTarefaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.especieTarefaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie tarefa',
                    content: 'Erro ao apagar a espécie tarefa id ' + action.payload.especieTarefaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new EspecieTarefaListActions.DeleteEspecieTarefaFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _especieTarefaService: EspecieTarefaService,
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

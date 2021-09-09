import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModelosEspecieSetorListActions from '../actions';

import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoModelo} from '@cdk/models';
import {vinculacaoModelo as vinculacaoModeloSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class ModelosEspecieSetorListEffects {

    routerState: any;
    /**
     * Get VinculacoesModelo with router parameters
     *
     * @type {Observable<any>}
     */
    getModelosEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ModelosEspecieSetorListActions.GetModelosEspecieSetor>(ModelosEspecieSetorListActions.GET_MODELOS_ESPECIE_SETOR),
        switchMap(action => this._vinculacaoModeloService.query(
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
                new AddData<VinculacaoModelo>({data: response['entities'], schema: vinculacaoModeloSchema}),
                new ModelosEspecieSetorListActions.GetModelosEspecieSetorSuccess({
                    entitiesId: response['entities'].map(vinculacaoModelo => vinculacaoModelo.id),
                    loaded: {
                        id: 'modeloHandle',
                        value: this.routerState.params.modeloHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ModelosEspecieSetorListActions.GetModelosEspecieSetorFailed(err));
            })
        ))
    ));
    /**
     * Delete VinculacaoModelo
     *
     * @type {Observable<any>}
     */
    deleteModeloEspecieSetor: Observable<ModelosEspecieSetorListActions.ModelosEspecieSetorActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ModelosEspecieSetorListActions.DeleteModeloEspecieSetor>(ModelosEspecieSetorListActions.DELETE_MODELO_ESPECIE_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'modelo espécie setor',
            content: 'Apagando a espécie setor do modelo...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoModeloService.destroy(action.payload.vinculacaoModeloId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modelo espécie setor',
                    content: 'Espécie Setor removida de modelo com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<VinculacaoModelo>({
                    id: response.id,
                    schema: vinculacaoModeloSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new ModelosEspecieSetorListActions.DeleteModeloEspecieSetorSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoModeloId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modelo espécie setor',
                    content: 'Erro ao apagar a espécie setor de um modelo!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ModelosEspecieSetorListActions.DeleteModeloEspecieSetorFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoModeloService: VinculacaoModeloService,
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

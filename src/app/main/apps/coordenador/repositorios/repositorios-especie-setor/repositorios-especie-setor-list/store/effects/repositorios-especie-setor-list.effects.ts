import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as RepositoriosEspecieSetorListActions from '../actions';

import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoRepositorio} from '@cdk/models';
import {vinculacaoRepositorio as vinculacaoRepositorioschema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class RepositoriosEspecieSetorListEffects {
    routerState: any;
    /**
     * Get VinculacoesRepositorio with router parameters
     *
     * @type {Observable<any>}
     */
    getRepositoriosEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RepositoriosEspecieSetorListActions.GetRepositoriosEspecieSetor>(RepositoriosEspecieSetorListActions.GET_REPOSITORIOS_ESPECIE_SETOR),
        switchMap(action => this._vinculacaoRepositorioservice.query(
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
                new AddData<VinculacaoRepositorio>({data: response['entities'], schema: vinculacaoRepositorioschema}),
                new RepositoriosEspecieSetorListActions.GetRepositoriosEspecieSetorSuccess({
                    entitiesId: response['entities'].map(vinculacaoRepositorio => vinculacaoRepositorio.id),
                    loaded: {
                        id: 'repositorioHandle',
                        value: this.routerState.params.repositorioHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new RepositoriosEspecieSetorListActions.GetRepositoriosEspecieSetorFailed(err));
            })
        ))
    ));
    /**
     * Delete VinculacaoRepositorio
     *
     * @type {Observable<any>}
     */
    deleteRepositorioEspecieSetor: Observable<RepositoriosEspecieSetorListActions.RepositoriosEspecieSetorActionsAll> = createEffect(() => this._actions.pipe(
        ofType<RepositoriosEspecieSetorListActions.DeleteRepositorioEspecieSetor>(RepositoriosEspecieSetorListActions.DELETE_REPOSITORIO_ESPECIE_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tese espécie de setor',
            content: 'Apagando a vinculação entre tese e espécie de setor ...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoRepositorioservice.destroy(action.payload.vinculacaoRepositorioId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tese espécie de setor',
                    content: 'Vinculação entre tese e espécie de setor id ' + action.payload.vinculacaoRepositorioId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<VinculacaoRepositorio>({
                    id: response.id,
                    schema: vinculacaoRepositorioschema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new RepositoriosEspecieSetorListActions.DeleteRepositorioEspecieSetorSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.vinculacaoRepositorioId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tese espécie de setor',
                    content: 'Erro ao apagar a vinculação entre tese e espécie de setor id ' + action.payload.vinculacaoRepositorioId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new RepositoriosEspecieSetorListActions.DeleteRepositorioEspecieSetorFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _vinculacaoRepositorioservice: VinculacaoRepositorioService,
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

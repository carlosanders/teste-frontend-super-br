import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as CompetenciasListActions from '../actions';

import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoSetorMunicipio} from '@cdk/models/vinculacao-setor-municipio.model';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class CompetenciasListEffects {
    routerState: any;
    /**
     * Get VinculacaoSetorMunicipio[] with router parameters
     *
     * @type {Observable<any>}
     */
    getCompetencias: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CompetenciasListActions.GetCompetencias>(CompetenciasListActions.GET_COMPETENCIAS),
        switchMap(action => this._vinculacaoSetorMunicipioService.query(
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
                new AddData<VinculacaoSetorMunicipio>({
                    data: response['entities'],
                    schema: vinculacaoSetorMunicipioSchema
                }),
                new CompetenciasListActions.GetCompetenciasSuccess({
                    entitiesId: response['entities'].map(vinculacaoSetorMunicipio => vinculacaoSetorMunicipio.id),
                    loaded: {
                        id: 'unidadeHandle',
                        value: this.routerState.params['unidadeHandle']
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new CompetenciasListActions.GetCompetenciasFailed(err));
            })
        ))
    ));
    /**
     * Delete Competencia
     *
     * @type {Observable<any>}
     */
    deleteCompetencia: Observable<CompetenciasListActions.CompetenciasListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<CompetenciasListActions.DeleteCompetencia>(CompetenciasListActions.DELETE_COMPETENCIA),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'competência',
            content: 'Apagando a competência id ' + action.payload.competenciaId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._vinculacaoSetorMunicipioService.destroy(action.payload.competenciaId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'competência',
                    content: 'Competência id ' + action.payload.competenciaId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<VinculacaoSetorMunicipio>({
                    id: response.id,
                    schema: vinculacaoSetorMunicipioSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new CompetenciasListActions.DeleteCompetenciaSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.competenciaId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'competência',
                    content: 'Erro ao apagar a competência id ' + action.payload.competenciaId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new CompetenciasListActions.DeleteCompetenciaFailed(payload));
            })
        ), 25)
    ));

    /**
     *
     * @param _actions
     * @param _vinculacaoSetorMunicipioService
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _vinculacaoSetorMunicipioService: VinculacaoSetorMunicipioService,
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

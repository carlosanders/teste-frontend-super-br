import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as CompetenciasListActions from '../actions';

import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {VinculacaoSetorMunicipio} from '@cdk/models/vinculacao-setor-municipio.model';
import {vinculacaoSetorMunicipio as vinculacaoSetorMunicipioSchema} from '@cdk/normalizr/vinculacao-setor-municipio.schema';

@Injectable()
export class CompetenciasListEffects {

    routerState: any;

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
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get VinculacaoSetorMunicipio[] with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getCompetencias: any =
        this._actions
            .pipe(
                ofType<CompetenciasListActions.GetCompetencias>(CompetenciasListActions.GET_COMPETENCIAS),
                switchMap((action) => {
                    return this._vinculacaoSetorMunicipioService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)).pipe(
                        mergeMap((response) => [
                            new AddData<VinculacaoSetorMunicipio>({data: response['entities'], schema: vinculacaoSetorMunicipioSchema}),
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
                    );
                })
            );

    /**
     * Delete Competencia
     * @type {Observable<any>}
     */
    @Effect()
    deleteCompetencia: any =
        this._actions
            .pipe(
                ofType<CompetenciasListActions.DeleteCompetencia>(CompetenciasListActions.DELETE_COMPETENCIA),
                mergeMap((action) => {
                    return this._vinculacaoSetorMunicipioService.destroy(action.payload).pipe(
                        map((response) => new CompetenciasListActions.DeleteCompetenciaSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new CompetenciasListActions.DeleteCompetenciaFailed(action.payload));
                        })
                    );
                })
            );

}

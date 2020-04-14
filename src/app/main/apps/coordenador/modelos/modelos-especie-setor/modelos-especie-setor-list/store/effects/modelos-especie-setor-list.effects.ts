import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModelosEspecieSetorListActions from '../actions';

import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {VinculacaoModelo} from '@cdk/models';
import {vinculacaoModelo as vinculacaoModeloSchema} from '@cdk/normalizr/vinculacao-modelo.schema';

@Injectable()
export class ModelosEspecieSetorListEffects {

    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoModeloService: VinculacaoModeloService,
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
     * Get VinculacoesModelo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getModelosEspecieSetor: any =
        this._actions
            .pipe(
                ofType<ModelosEspecieSetorListActions.GetModelosEspecieSetor>(ModelosEspecieSetorListActions.GET_MODELOS_ESPECIE_SETOR),
                switchMap((action) => {
                    return this._vinculacaoModeloService.query(
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
                    );
                })
            );

    /**
     * Delete VinculacaoModelo
     * @type {Observable<any>}
     */
    @Effect()
    deleteModeloEspecieSetor: any =
        this._actions
            .pipe(
                ofType<ModelosEspecieSetorListActions.DeleteModeloEspecieSetor>(ModelosEspecieSetorListActions.DELETE_MODELO_ESPECIE_SETOR),
                mergeMap((action) => {
                    return this._vinculacaoModeloService.destroy(action.payload).pipe(
                        map((response) => new ModelosEspecieSetorListActions.DeleteModeloEspecieSetorSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new ModelosEspecieSetorListActions.DeleteModeloEspecieSetorFailed(action.payload));
                        })
                    );
                })
            );
}

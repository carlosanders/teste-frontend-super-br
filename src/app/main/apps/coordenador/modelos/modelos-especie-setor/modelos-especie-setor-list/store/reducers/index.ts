import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModelosEspecieSetorListReducer, ModelosEspecieSetorListState} from './modelos-especie-setor-list.reducer';

export interface ModelosEspecieSetorListAppState
{
    modelosEspecieSetorList: ModelosEspecieSetorListState;
}

export const getModelosEspecieSetorListAppState = createFeatureSelector<ModelosEspecieSetorListAppState>(
    'modelos-especie-setor-list-app'
);

export const getAppState: any = createSelector(
    getModelosEspecieSetorListAppState,
    (state: ModelosEspecieSetorListAppState) => state
);

export const reducers: ActionReducerMap<ModelosEspecieSetorListAppState> = {
    modelosEspecieSetorList: ModelosEspecieSetorListReducer
};

export * from './modelos-especie-setor-list.reducer';

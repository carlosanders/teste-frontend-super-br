import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { EspecieSetorListReducer, EspecieSetorListState } from './especie-setor-list.reducer';

export interface EspecieSetorListAppState
{
    especieSetorList: EspecieSetorListState;
}

export const getEspecieSetorListAppState = createFeatureSelector<EspecieSetorListAppState>(
    'coordenador-especie-setor-list-app'
);

export const getAppState = createSelector(
    getEspecieSetorListAppState,
    (state: EspecieSetorListAppState) => state
);

export const reducers: ActionReducerMap<EspecieSetorListAppState> = {
    especieSetorList: EspecieSetorListReducer
};

export * from './especie-setor-list.reducer';

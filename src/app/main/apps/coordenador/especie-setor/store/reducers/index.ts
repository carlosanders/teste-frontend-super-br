import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { EspecieSetorReducer, EspecieSetorState } from './especie-setor.reducer';

export interface EspecieSetorAppState
{
    especieSetor: EspecieSetorState;
}

export const getEspecieSetorAppState = createFeatureSelector<EspecieSetorAppState>(
    'especie-setor-app'
);

export const getAppState = createSelector(
    getEspecieSetorAppState,
    (state: EspecieSetorAppState) => state
);

export const reducers: ActionReducerMap<EspecieSetorAppState> = {
    especieSetor: EspecieSetorReducer
};

export * from './especie-setor.reducer';

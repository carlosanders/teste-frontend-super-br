import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieProcessoListReducer, EspecieProcessoListState} from './especie-processo-list.reducer';

export interface EspecieProcessoListAppState {
    especieProcessoList: EspecieProcessoListState;
}

export const getEspecieProcessoListAppState = createFeatureSelector<EspecieProcessoListAppState>(
    'especie-processo-list'
);

export const getAppState = createSelector(
    getEspecieProcessoListAppState,
    (state: EspecieProcessoListAppState) => state
);

export const reducers: ActionReducerMap<EspecieProcessoListAppState> = {
    especieProcessoList: EspecieProcessoListReducer
};

export * from './especie-processo-list.reducer';

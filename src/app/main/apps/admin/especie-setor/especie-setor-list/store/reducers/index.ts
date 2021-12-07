import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieSetorListReducer, EspecieSetorListState} from './especie-setor-list.reducer';

export interface EspecieSetorListAppState {
    especieSetorList: EspecieSetorListState;
}

export const getEspecieSetorListAppState = createFeatureSelector<EspecieSetorListAppState>(
    'especie-setor-list'
);

export const getAppState: any = createSelector(
    getEspecieSetorListAppState,
    (state: EspecieSetorListAppState) => state
);

export const reducers: ActionReducerMap<EspecieSetorListAppState> = {
    especieSetorList: EspecieSetorListReducer
};

export * from './especie-setor-list.reducer';

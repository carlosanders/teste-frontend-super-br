import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieProcessoEditReducer, EspecieProcessoEditState} from './especie-processo-edit.reducer';

export interface EspecieProcessoEditAppState {
    especieProcesso: EspecieProcessoEditState;
}

export const getEspecieProcessoEditAppState = createFeatureSelector<EspecieProcessoEditAppState>(
    'especie-processo-edit-app'
);

export const getAppState: any = createSelector(
    getEspecieProcessoEditAppState,
    (state: EspecieProcessoEditAppState) => state
);

export const reducers: ActionReducerMap<EspecieProcessoEditAppState> = {
    especieProcesso: EspecieProcessoEditReducer
};

export * from './especie-processo-edit.reducer';

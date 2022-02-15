import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieSetorEditReducer, EspecieSetorEditState} from './especie-setor-edit.reducer';

export interface EspecieSetorEditAppState {
    especieSetor: EspecieSetorEditState;
}

export const getEspecieSetorEditAppState = createFeatureSelector<EspecieSetorEditAppState>(
    'especie-setor-edit-app'
);

export const getAppState: any = createSelector(
    getEspecieSetorEditAppState,
    (state: EspecieSetorEditAppState) => state
);

export const reducers: ActionReducerMap<EspecieSetorEditAppState> = {
    especieSetor: EspecieSetorEditReducer
};

export * from './especie-setor-edit.reducer';

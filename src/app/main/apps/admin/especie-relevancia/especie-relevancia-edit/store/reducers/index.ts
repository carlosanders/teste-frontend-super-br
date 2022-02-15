import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieRelevanciaEditReducer, EspecieRelevanciaEditState} from './especie-relevancia-edit.reducer';

export interface EspecieRelevanciaEditAppState {
    especieRelevancia: EspecieRelevanciaEditState;
}

export const getEspecieRelevanciaEditAppState = createFeatureSelector<EspecieRelevanciaEditAppState>(
    'especie-relevancia-edit-app'
);

export const getAppState: any = createSelector(
    getEspecieRelevanciaEditAppState,
    (state: EspecieRelevanciaEditAppState) => state
);

export const reducers: ActionReducerMap<EspecieRelevanciaEditAppState> = {
    especieRelevancia: EspecieRelevanciaEditReducer
};

export * from './especie-relevancia-edit.reducer';

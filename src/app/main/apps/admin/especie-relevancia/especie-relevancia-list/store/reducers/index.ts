import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {EspecieRelevanciaListReducer, EspecieRelevanciaListState} from './especie-relevancia-list.reducer';

export interface EspecieRelevanciaListAppState {
    especieRelevanciaList: EspecieRelevanciaListState;
}

export const getEspecieRelevanciaListAppState = createFeatureSelector<EspecieRelevanciaListAppState>(
    'especie-relevancia-list'
);

export const getAppState: any = createSelector(
    getEspecieRelevanciaListAppState,
    (state: EspecieRelevanciaListAppState) => state
);

export const reducers: ActionReducerMap<EspecieRelevanciaListAppState> = {
    especieRelevanciaList: EspecieRelevanciaListReducer
};

export * from './especie-relevancia-list.reducer';

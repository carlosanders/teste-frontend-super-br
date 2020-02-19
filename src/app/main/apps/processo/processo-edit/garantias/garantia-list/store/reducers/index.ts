import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { GarantiaListReducer, GarantiaListState } from './garantia-list.reducer';

export interface GarantiaListAppState
{
    garantiaList: GarantiaListState;
}

export const getGarantiaListAppState = createFeatureSelector<GarantiaListAppState>(
    'garantia-list-app'
);

export const getAppState = createSelector(
    getGarantiaListAppState,
    (state: GarantiaListAppState) => state
);

export const reducers: ActionReducerMap<GarantiaListAppState> = {
    garantiaList: GarantiaListReducer
};

export * from './garantia-list.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { GarantiaEditReducer, GarantiaEditState } from './garantia-edit.reducer';

export interface GarantiaEditAppState
{
    garantia: GarantiaEditState;
}

export const getGarantiaEditAppState = createFeatureSelector<GarantiaEditAppState>(
    'garantia-edit-app'
);

export const getAppState = createSelector(
    getGarantiaEditAppState,
    (state: GarantiaEditAppState) => state
);

export const reducers: ActionReducerMap<GarantiaEditAppState> = {
    garantia: GarantiaEditReducer
};

export * from './garantia-edit.reducer';

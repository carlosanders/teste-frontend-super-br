import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelevanciaEditReducer, RelevanciaEditState} from './relevancia-edit.reducer';

export interface RelevanciaEditAppState
{
    Relevancia: RelevanciaEditState;
}

export const getRelevanciaEditAppState = createFeatureSelector<RelevanciaEditAppState>(
    'relevancia-edit-app'
);

export const getAppState: any = createSelector(
    getRelevanciaEditAppState,
    (state: RelevanciaEditAppState) => state
);

export const reducers: ActionReducerMap<RelevanciaEditAppState> = {
    Relevancia: RelevanciaEditReducer
};

export * from './relevancia-edit.reducer';

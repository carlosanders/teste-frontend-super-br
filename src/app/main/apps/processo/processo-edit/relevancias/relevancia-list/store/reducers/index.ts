import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RelevanciaListReducer, RelevanciaListState} from './relevancia-list.reducer';

export interface RelevanciaListAppState
{
    relevanciaList: RelevanciaListState;
}

export const getRelevanciaListAppState = createFeatureSelector<RelevanciaListAppState>(
    'relevancia-list-app'
);

export const getAppState: any = createSelector(
    getRelevanciaListAppState,
    (state: RelevanciaListAppState) => state
);

export const reducers: ActionReducerMap<RelevanciaListAppState> = {
    relevanciaList: RelevanciaListReducer
};

export * from './relevancia-list.reducer';

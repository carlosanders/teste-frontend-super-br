import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RootLocalizadoresListReducer, RootLocalizadoresListState } from './localizadores-list.reducer';

export interface RootLocalizadoresListAppState
{
    localizadoresList: RootLocalizadoresListState;
}

export const getRootLocalizadoresListAppState = createFeatureSelector<RootLocalizadoresListAppState>(
    'root-localizadores-list-app'
);

export const getAppState = createSelector(
    getRootLocalizadoresListAppState,
    (state: RootLocalizadoresListAppState) => state
);

export const reducers: ActionReducerMap<RootLocalizadoresListAppState> = {
    localizadoresList: RootLocalizadoresListReducer
};

export * from './localizadores-list.reducer';

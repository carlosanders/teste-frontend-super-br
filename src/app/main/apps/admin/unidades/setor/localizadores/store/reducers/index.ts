import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RootLocalizadoresReducer, RootLocalizadoresState } from './localizadores.reducer';

export interface RootLocalizadoresAppState
{
    localizador: RootLocalizadoresState;
}

export const getRootLocalizadoresAppState = createFeatureSelector<RootLocalizadoresAppState>(
    'root-localizadores-app'
);

export const getAppState = createSelector(
    getRootLocalizadoresAppState,
    (state: RootLocalizadoresAppState) => state
);

export const reducers: ActionReducerMap<RootLocalizadoresAppState> = {
    localizador: RootLocalizadoresReducer
};

export * from './localizadores.reducer';

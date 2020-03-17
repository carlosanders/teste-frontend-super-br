import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { LocalizadorReducer, LocalizadorState } from './localizador.reducer';

export interface LocalizadorAppState
{
    localizador: LocalizadorState;
}

export const getLocalizadorAppState = createFeatureSelector<LocalizadorAppState>(
    'localizadores-app'
);

export const getAppState = createSelector(
    getLocalizadorAppState,
    (state: LocalizadorAppState) => state
);

export const reducers: ActionReducerMap<LocalizadorAppState> = {
    localizador: LocalizadorReducer
};

export * from './localizador.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {LocalizadorEditReducer, LocalizadorEditState} from './localizador-edit.reducer';

export interface LocalizadorEditAppState
{
    localizador: LocalizadorEditState;
}

export const getLocalizadorEditAppState = createFeatureSelector<LocalizadorEditAppState>(
    'localizador-edit-app'
);

export const getAppState: any = createSelector(
    getLocalizadorEditAppState,
    (state: LocalizadorEditAppState) => state
);

export const reducers: ActionReducerMap<LocalizadorEditAppState> = {
    localizador: LocalizadorEditReducer
};

export * from './localizador-edit.reducer';

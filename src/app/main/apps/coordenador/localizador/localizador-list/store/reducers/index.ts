import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {LocalizadorListReducer, LocalizadorListState} from './localizador-list.reducer';

export interface LocalizadorListAppState
{
    localizadorList: LocalizadorListState;
}

export const getLocalizadorListAppState = createFeatureSelector<LocalizadorListAppState>(
    'localizador-list-app'
);

export const getAppState: any = createSelector(
    getLocalizadorListAppState,
    (state: LocalizadorListAppState) => state
);

export const reducers: ActionReducerMap<LocalizadorListAppState> = {
    localizadorList: LocalizadorListReducer
};

export * from './localizador-list.reducer';

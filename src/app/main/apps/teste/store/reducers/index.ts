import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TesteReducer, TesteState } from './teste.reducer';

export interface TesteAppState
{
    teste: TesteState;
}

export const getTesteAppState = createFeatureSelector<TesteAppState>(
    'teste-app'
);

export const getAppState = createSelector(
    getTesteAppState,
    (state: TesteAppState) => state
);

export const reducers: ActionReducerMap<TesteAppState> = {
    teste: TesteReducer
};

export * from './teste.reducer';

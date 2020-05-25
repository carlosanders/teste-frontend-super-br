import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessoReducer, ProcessoState } from './processo.reducer';
import {FavoritoListReducer, FavoritoListState} from "./favorito-list.reducer";

export interface ProcessoAppState
{
    processo: ProcessoState;
    favorito: FavoritoListState;
}

export const getProcessoAppState = createFeatureSelector<ProcessoAppState>(
    'processo-app'
);

export const getAppState = createSelector(
    getProcessoAppState,
    (state: ProcessoAppState) => state
);

export const reducers: ActionReducerMap<ProcessoAppState> = {
    processo: ProcessoReducer,
    favorito: FavoritoListReducer
};

export * from './processo.reducer';
export * from './favorito-list.reducer';
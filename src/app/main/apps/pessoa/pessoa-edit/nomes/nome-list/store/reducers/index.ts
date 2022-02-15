import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NomeListReducer, NomeListState} from './nome-list.reducer';

export interface NomeListAppState {
    nomeList: NomeListState;
}

export const getNomeListAppState = createFeatureSelector<NomeListAppState>(
    'nome-list-app'
);

export const getAppState: any = createSelector(
    getNomeListAppState,
    (state: NomeListAppState) => state
);

export const reducers: ActionReducerMap<NomeListAppState> = {
    nomeList: NomeListReducer
};

export * from './nome-list.reducer';

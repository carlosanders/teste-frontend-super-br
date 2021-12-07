import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AfastamentosListReducer, AfastamentosListState} from './afastamentos-list.reducer';

export interface AfastamentosListAppState {
    afastamentosList: AfastamentosListState;
}

export const getAfastamentosListAppState = createFeatureSelector<AfastamentosListAppState>(
    'admin-afastamentos-list-app'
);

export const getAppState: any = createSelector(
    getAfastamentosListAppState,
    (state: AfastamentosListAppState) => state
);

export const reducers: ActionReducerMap<AfastamentosListAppState> = {
    afastamentosList: AfastamentosListReducer
};

export * from './afastamentos-list.reducer';

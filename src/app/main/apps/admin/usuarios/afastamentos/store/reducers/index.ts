import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AfastamentosReducer, AfastamentosState} from './afastamentos.reducer';

export interface AfastamentosAppState
{
    afastamentos: AfastamentosState;
}

export const getAfastamentosAppState = createFeatureSelector<AfastamentosAppState>(
    'admin-afastamentos-app'
);

export const getAppState = createSelector(
    getAfastamentosAppState,
    (state: AfastamentosAppState) => state
);

export const reducers: ActionReducerMap<AfastamentosAppState> = {
    afastamentos: AfastamentosReducer
};

export * from './afastamentos.reducer';

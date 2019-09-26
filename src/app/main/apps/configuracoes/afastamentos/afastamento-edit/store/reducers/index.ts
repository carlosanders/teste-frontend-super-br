import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AfastamentoEditReducer, AfastamentoEditState } from './afastamento-edit.reducer';

export interface AfastamentoEditAppState
{
    afastamento: AfastamentoEditState;
}

export const getAfastamentoEditAppState = createFeatureSelector<AfastamentoEditAppState>(
    'afastamento-edit-app'
);

export const getAppState = createSelector(
    getAfastamentoEditAppState,
    (state: AfastamentoEditAppState) => state
);

export const reducers: ActionReducerMap<AfastamentoEditAppState> = {
    afastamento: AfastamentoEditReducer
};

export * from './afastamento-edit.reducer';

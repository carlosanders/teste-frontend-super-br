import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { PessoaEditReducer, PessoaEditState } from './pessoa-edit.reducer';

export interface PessoaEditAppState
{
    pessoa: PessoaEditState;
}

export const getPessoaEditAppState = createFeatureSelector<PessoaEditAppState>(
    'pessoa-edit-app'
);

export const getAppState = createSelector(
    getPessoaEditAppState,
    (state: PessoaEditAppState) => state
);

export const reducers: ActionReducerMap<PessoaEditAppState> = {
    pessoa: PessoaEditReducer
};

export * from './pessoa-edit.reducer';

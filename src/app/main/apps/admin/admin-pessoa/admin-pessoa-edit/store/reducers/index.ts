import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AdminPessoaEditReducer, PessoaEditState} from './admin-pessoa-edit.reducer';

export interface PessoaEditAppState {
    pessoa: PessoaEditState;
}

export const getPessoaEditAppState = createFeatureSelector<PessoaEditAppState>(
    'admin-pessoa-edit-app'
);

export const getAppState: any = createSelector(
    getPessoaEditAppState,
    (state: PessoaEditAppState) => state
);

export const reducers: ActionReducerMap<PessoaEditAppState> = {
    pessoa: AdminPessoaEditReducer
};

export * from './admin-pessoa-edit.reducer';

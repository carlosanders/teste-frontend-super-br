import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AdminPessoaListReducer, PessoaListState} from './admin-pessoa-list.reducer';

export interface PessoaListAppState {
    pessoaList: PessoaListState;
}

export const getPessoaListAppState = createFeatureSelector<PessoaListAppState>(
    'admin-pessoa-list'
);

export const getAppState: any = createSelector(
    getPessoaListAppState,
    (state: PessoaListAppState) => state
);

export const reducers: ActionReducerMap<PessoaListAppState> = {
    pessoaList: AdminPessoaListReducer
};

export * from './admin-pessoa-list.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {PessoaListReducer, PessoaListState} from './pessoa-list.reducer';

export interface PessoaListAppState
{
    pessoaList: PessoaListState;
}

export const getPessoaListAppState = createFeatureSelector<PessoaListAppState>(
    'pessoa-list-app'
);

export const getAppState: any = createSelector(
    getPessoaListAppState,
    (state: PessoaListAppState) => state
);

export const reducers: ActionReducerMap<PessoaListAppState> = {
    pessoaList: PessoaListReducer
};

export * from './pessoa-list.reducer';

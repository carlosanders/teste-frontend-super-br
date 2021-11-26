import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {DadosPessoaEditReducer, DadosPessoaEditState} from './dados-pessoa-edit.reducer';

export interface DadosPessoaEditAppState
{
    pessoa: DadosPessoaEditState;
}

export const getDadosPessoaEditAppState = createFeatureSelector<DadosPessoaEditAppState>(
    'dados-pessoa-edit-app'
);

export const getAppState: any = createSelector(
    getDadosPessoaEditAppState,
    (state: DadosPessoaEditAppState) => state
);

export const reducers: ActionReducerMap<DadosPessoaEditAppState> = {
    pessoa: DadosPessoaEditReducer
};

export * from './dados-pessoa-edit.reducer';

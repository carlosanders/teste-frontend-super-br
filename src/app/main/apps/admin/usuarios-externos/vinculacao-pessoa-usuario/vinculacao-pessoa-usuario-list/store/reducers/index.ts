import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    VinculacaoPessoaUsuarioListReducer,
    VinculacaoPessoaUsuarioListState
} from './vinculacao-pessoa-usuario-list.reducer';

export interface VinculacaoPessoaUsuarioListAppState {
    vinculacaoPessoaUsuarioList: VinculacaoPessoaUsuarioListState;
}

export const getVinculacaoPessoaUsuarioListAppState = createFeatureSelector<VinculacaoPessoaUsuarioListAppState>(
    'vinculacao-pessoa-usuario-list'
);

export const getAppState: any = createSelector(
    getVinculacaoPessoaUsuarioListAppState,
    (state: VinculacaoPessoaUsuarioListAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoPessoaUsuarioListAppState> = {
    vinculacaoPessoaUsuarioList: VinculacaoPessoaUsuarioListReducer
};

export * from './vinculacao-pessoa-usuario-list.reducer';

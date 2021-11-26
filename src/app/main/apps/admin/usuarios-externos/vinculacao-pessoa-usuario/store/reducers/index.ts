import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {VinculacaoPessoaUsuarioReducer, VinculacaoPessoaUsuarioState} from './vinculacao-pessoa-usuario.reducer';

export interface VinculacaoPessoaUsuarioAppState {
    vinculacoesPessoaUsuario: VinculacaoPessoaUsuarioState;
}

export const getVinculacaoPessoaUsuarioAppState = createFeatureSelector<VinculacaoPessoaUsuarioAppState>(
    'admin-vinculacao-pessoa-usuario-app'
);

export const getAppState: any = createSelector(
    getVinculacaoPessoaUsuarioAppState,
    (state: VinculacaoPessoaUsuarioAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoPessoaUsuarioAppState> = {
    vinculacoesPessoaUsuario: VinculacaoPessoaUsuarioReducer
};

export * from './vinculacao-pessoa-usuario.reducer';

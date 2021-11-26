import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
    VinculacaoPessoaUsuarioEditReducer,
    VinculacaoPessoaUsuarioEditState
} from './vinculacao-pessoa-usuario-edit.reducer';

export interface VinculacaoPessoaUsuarioEditAppState {
    vinculacaoPessoaUsuario: VinculacaoPessoaUsuarioEditState;
}

export const getVinculacaoPessoaUsuarioEditAppState = createFeatureSelector<VinculacaoPessoaUsuarioEditAppState>(
    'admin-vinculacao-pessoa-usuario-edit-app'
);

export const getAppState: any = createSelector(
    getVinculacaoPessoaUsuarioEditAppState,
    (state: VinculacaoPessoaUsuarioEditAppState) => state
);

export const reducers: ActionReducerMap<VinculacaoPessoaUsuarioEditAppState> = {
    vinculacaoPessoaUsuario: VinculacaoPessoaUsuarioEditReducer
};

export * from './vinculacao-pessoa-usuario-edit.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {RedistribuicaoEditBlocoReducer, RedistribuicaoEditBlocoState} from './redistribuicao-edit-bloco.reducer';

export interface RedistribuicaoEditBlocoAppState
{
    tarefaEditBloco: RedistribuicaoEditBlocoState;
}

export const getRedistribuicaoEditBlocoAppState = createFeatureSelector<RedistribuicaoEditBlocoAppState>(
    'redistribuicao-edit-bloco-app'
);

export const getAppState: any = createSelector(
    getRedistribuicaoEditBlocoAppState,
    (state: RedistribuicaoEditBlocoAppState) => state
);

export const reducers: ActionReducerMap<RedistribuicaoEditBlocoAppState> = {
    tarefaEditBloco: RedistribuicaoEditBlocoReducer
};

export * from './redistribuicao-edit-bloco.reducer';

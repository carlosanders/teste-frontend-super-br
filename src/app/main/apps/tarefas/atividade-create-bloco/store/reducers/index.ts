import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtividadeCreateBlocoReducer, AtividadeCreateBlocoState } from './atividade-create-bloco.reducer';

export interface AtividadeCreateBlocoAppState
{
    atividadeCreateBloco: AtividadeCreateBlocoState;
}

export const getAtividadeCreateBlocoAppState = createFeatureSelector<AtividadeCreateBlocoAppState>(
    'atividade-create-bloco-app'
);

export const getAppState = createSelector(
    getAtividadeCreateBlocoAppState,
    (state: AtividadeCreateBlocoAppState) => state
);

export const reducers: ActionReducerMap<AtividadeCreateBlocoAppState> = {
    atividadeCreateBloco: AtividadeCreateBlocoReducer
};

export * from './atividade-create-bloco.reducer';

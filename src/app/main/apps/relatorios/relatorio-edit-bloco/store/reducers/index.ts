import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RelatorioEditBlocoReducer, RelatorioEditBlocoState } from './relatorio-edit-bloco.reducer';

export interface RelatorioEditBlocoAppState
{
    relatorioEditBloco: RelatorioEditBlocoState;
}

export const getRelatorioEditBlocoAppState = createFeatureSelector<RelatorioEditBlocoAppState>(
    'relatorio-edit-bloco-app'
);

export const getAppState = createSelector(
    getRelatorioEditBlocoAppState,
    (state: RelatorioEditBlocoAppState) => state
);

export const reducers: ActionReducerMap<RelatorioEditBlocoAppState> = {
    relatorioEditBloco: RelatorioEditBlocoReducer
};

export * from './relatorio-edit-bloco.reducer';

import {ArquivistaClassificacaoBlocoReducer, ArquivistaClassificacaoBlocoState} from './arquivista-classificacao-bloco.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ArquivistaClassificacaoBlocoAppState {
    arquivistaClassificacao: ArquivistaClassificacaoBlocoState;
}

export const getArquivistaClassificacaoBlocoAppState = createFeatureSelector<ArquivistaClassificacaoBlocoAppState>('app-arquivista-classificacao-bloco');

export const getAppState = createSelector(
    getArquivistaClassificacaoBlocoAppState,
    (state: ArquivistaClassificacaoBlocoAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaClassificacaoBlocoAppState> = {
    arquivistaClassificacao: ArquivistaClassificacaoBlocoReducer
};

export * from './arquivista-classificacao-bloco.reducers';

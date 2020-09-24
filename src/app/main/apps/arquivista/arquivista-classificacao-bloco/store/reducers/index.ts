import {ArquivistaClassificacaoBlocoReducer, ArquivistaClassificacaoBlocoState} from './arquivista-classificacao-bloco.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ArquivistaClassificacaoBlocoAppState {
    arquivistaClassificacaoBloco: ArquivistaClassificacaoBlocoState;
}

export const getArquivistaClassificacaoBlocoAppState = createFeatureSelector<ArquivistaClassificacaoBlocoAppState>('<span class="mr-4 ml-4">/</span>arquivista-classificacao-bloco');

export const getAppState = createSelector(
    getArquivistaClassificacaoBlocoAppState,
    (state: ArquivistaClassificacaoBlocoAppState) => state
);

export const reducers: ActionReducerMap<ArquivistaClassificacaoBlocoAppState> = {
    arquivistaClassificacaoBloco: ArquivistaClassificacaoBlocoReducer
};

export * from './arquivista-classificacao-bloco.reducers';

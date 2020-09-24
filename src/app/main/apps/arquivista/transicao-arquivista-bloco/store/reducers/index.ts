import {TransicaoArquivistaBlocoReducer, TransicaoArquivistaBlocoState} from './transicao-arquivista-bloco.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface TransicaoArquivistaBlocoAppState {
    transicaoArquivistaBloco: TransicaoArquivistaBlocoState;
}

export const getTransicaoArquivistaBlocoAppState = createFeatureSelector<TransicaoArquivistaBlocoAppState>('<span class="mr-4 ml-4">/</span>arquivista-classificacao-bloco');

export const getAppState = createSelector(
    getTransicaoArquivistaBlocoAppState,
    (state: TransicaoArquivistaBlocoAppState) => state
);

export const reducers: ActionReducerMap<TransicaoArquivistaBlocoAppState> = {
    transicaoArquivistaBloco: TransicaoArquivistaBlocoReducer
};

export * from './transicao-arquivista-bloco.reducers';

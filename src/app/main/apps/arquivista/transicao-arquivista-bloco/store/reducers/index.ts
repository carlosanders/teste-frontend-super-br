import {TransicaoArquivistaBlocoReducer, TransicaoArquivistaBlocoState} from './transicao-arquivista-bloco.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface TransicaoArquivistaBlocoAppState {
    transicaoArquivistaBloco: TransicaoArquivistaBlocoState;
}

export const getTransicaoArquivistaBlocoAppState = createFeatureSelector<TransicaoArquivistaBlocoAppState>('arquivista-classificacao-bloco');

export const getAppState = createSelector(
    getTransicaoArquivistaBlocoAppState,
    (state: TransicaoArquivistaBlocoAppState) => state
);

export const reducers: ActionReducerMap<TransicaoArquivistaBlocoAppState> = {
    transicaoArquivistaBloco: TransicaoArquivistaBlocoReducer
};

export * from './transicao-arquivista-bloco.reducers';

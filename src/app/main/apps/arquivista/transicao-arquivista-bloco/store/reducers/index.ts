import {TransicaoArquivistaBlocoReducer, TransicaoArquivistaBlocoState} from './transicao-arquivista-bloco.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ModalidadeTransicaoReducer, ModalidadeTransicaoState} from './modalidade-transicao.reducer';

export interface TransicaoArquivistaBlocoAppState {
    transicaoArquivistaBloco: TransicaoArquivistaBlocoState;
    modalidadeTransicao: ModalidadeTransicaoState;
}

export const getTransicaoArquivistaBlocoAppState = createFeatureSelector<TransicaoArquivistaBlocoAppState>('arquivista-transicao-bloco');

export const getAppState: any = createSelector(
    getTransicaoArquivistaBlocoAppState,
    (state: TransicaoArquivistaBlocoAppState) => state
);

export const reducers: ActionReducerMap<TransicaoArquivistaBlocoAppState> = {
    transicaoArquivistaBloco: TransicaoArquivistaBlocoReducer,
    modalidadeTransicao: ModalidadeTransicaoReducer
};

export * from './transicao-arquivista-bloco.reducers';
export * from './modalidade-transicao.reducer';

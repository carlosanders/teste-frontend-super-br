import {createSelector} from '@ngrx/store';

import {
    getTransicaoArquivistaBlocoAppState,
    TransicaoArquivistaBlocoAppState,
    TransicaoArquivistaBlocoState
} from '../reducers';

export const getTransicaoArquivistaBlocoState = createSelector(
    getTransicaoArquivistaBlocoAppState,
    (state: TransicaoArquivistaBlocoAppState) => state.transicaoArquivistaBloco
);

export const getIsSaving = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.saving
);

export const getErrors = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.errors
);

export const getBufferingTransicao = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.bufferingTransicao
);

export const getTransicaoProcessoIds = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.transicaoProcessoIds
);

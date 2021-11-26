import {createSelector} from '@ngrx/store';

import {
    getTransicaoArquivistaBlocoAppState,
    TransicaoArquivistaBlocoAppState,
    TransicaoArquivistaBlocoState
} from '../reducers';

export const getTransicaoArquivistaBlocoState: any = createSelector(
    getTransicaoArquivistaBlocoAppState,
    (state: TransicaoArquivistaBlocoAppState) => state.transicaoArquivistaBloco
);

export const getIsSaving: any = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.saving
);

export const getErrors: any = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.errors
);

export const getBufferingTransicao: any = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.bufferingTransicao
);

export const getTransicaoProcessoIds: any = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.transicaoProcessoIds
);

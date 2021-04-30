import {createSelector} from '@ngrx/store';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoShema} from '@cdk/normalizr';
import {
    getTransicaoArquivistaBlocoAppState,
    TransicaoArquivistaBlocoAppState,
    TransicaoArquivistaBlocoState
} from '../reducers';
import {getProcessosIds} from '../../../arquivista-list/store/selectors';

const schemaTransicaoArquivistaBlocoSelectors = createSchemaSelectors<Processo>(processoShema);

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

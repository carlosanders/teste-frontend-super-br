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

export const getProcessos = createSelector(
    schemaTransicaoArquivistaBlocoSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaTransicaoArquivistaBlocoSelectors.entitiesProjector
);

export const getIsSaving = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.saving
);

export const getHasLoaded = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.loaded
);

export const getErrors = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.errors
);

export const getDeletingIds = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTransicaoArquivistaBlocoState,
    (state: TransicaoArquivistaBlocoState) => state.deletedIds
);

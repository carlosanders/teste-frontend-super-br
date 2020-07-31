import { createSelector } from '@ngrx/store';
import { getArquivistaAppState, ArquivistaAppState, ArquivistaState } from 'app/main/apps/arquivista/arquivista-list/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { processo as processoSchema } from '@cdk/normalizr';
import {Processo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getArquivistaState = createSelector(
    getArquivistaAppState,
    (state: ArquivistaAppState) => state.arquivista
);

export const getSelectedProcessoIds = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.selectedProcessoIds
);

export const getMaximizado = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.maximizado
);

export const getProcessosIds = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.entitiesId
);

export const getProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedProcessoIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.pagination
);

export const getProcessosLoaded = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.loaded
);

export const getIsLoading = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.loading
);

export const getDeletingProcessoIds = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.deletingProcessoIds
);

export const getDeletedProcessoIds = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.deletedProcessoIds
);

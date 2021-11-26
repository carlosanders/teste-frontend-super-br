import {createSelector} from '@ngrx/store';
import {
    ArquivistaAppState,
    ArquivistaState,
    getArquivistaAppState
} from 'app/main/apps/arquivista/arquivista-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Processo>(processoSchema);

export const getArquivistaState: any = createSelector(
    getArquivistaAppState,
    (state: ArquivistaAppState) => state.arquivista
);

export const getSelectedProcessoIds: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.selectedProcessoIds
);

export const getMaximizado: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.maximizado
);

export const getProcessosIds: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.entitiesId
);

export const getProcessos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedProcessos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedProcessoIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.pagination
);

export const getProcessosLoaded: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.loading
);

export const getDeletingProcessoIds: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.deletingProcessoIds
);

export const getDeletedProcessoIds: any = createSelector(
    getArquivistaState,
    (state: ArquivistaState) => state.deletedProcessoIds
);

import { createSelector } from '@ngrx/store';
import { getRelatoriosAppState, RelatoriosAppState, RelatoriosState } from 'app/main/apps/relatorios/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { relatorio as relatorioSchema } from '@cdk/normalizr/relatorio.schema';
import {Relatorio} from '@cdk/models/relatorio.model';

const schemaSelectors = createSchemaSelectors<Relatorio>(relatorioSchema);

export const getRelatoriosState = createSelector(
    getRelatoriosAppState,
    (state: RelatoriosAppState) => state.relatorios
);

export const getSelectedRelatorioIds = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.selectedRelatorioIds
);

export const getMaximizado = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.maximizado
);

export const getRelatoriosIds = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.entitiesId
);

export const getRelatorios = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelatoriosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedRelatorios = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedRelatorioIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.pagination
);

export const getRelatoriosLoaded = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.loaded
);

export const getIsLoading = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.loading
);

export const getDeletingRelatorioIds = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.deletingRelatorioIds
);

export const getDeletedRelatorioIds = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.deletedRelatorioIds
);

export const getLoadedRelatorioIds = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.loadedRelatorioIds
);

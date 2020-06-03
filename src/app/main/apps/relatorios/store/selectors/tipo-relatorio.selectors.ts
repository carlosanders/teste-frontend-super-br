import { createSelector } from '@ngrx/store';
import {TipoRelatoriosState, getRelatoriosAppState, RelatoriosAppState} from 'app/main/apps/relatorios/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { tipoRelatorio as tipoRelatorioSchema } from '@cdk/normalizr/tipo-relatorio.schema';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';

const schemaSelectors = createSchemaSelectors<TipoRelatorio>(tipoRelatorioSchema);

export const getTipoRelatoriosState = createSelector(
    getRelatoriosAppState,
    (state: RelatoriosAppState)  => state.tipoRelatorios
);

export const getSelectedTipoRelatorioIds = createSelector(
    getTipoRelatoriosState,
    (state: TipoRelatoriosState) => state.selectedTipoRelatorioIds
);

export const getTipoRelatoriosIds = createSelector(
    getTipoRelatoriosState,
    (state: TipoRelatoriosState) => state.entitiesId
);

export const getTipoRelatorios = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoRelatoriosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedTipoRelatorios = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTipoRelatorioIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationTipoRelatorio = createSelector(
    getTipoRelatoriosState,
    (state: TipoRelatoriosState) => state.pagination
);

export const getTipoRelatoriosLoaded = createSelector(
    getTipoRelatoriosState,
    (state: TipoRelatoriosState) => state.loaded
);

export const getIsLoadingTipoRelatorio = createSelector(
    getTipoRelatoriosState,
    (state: TipoRelatoriosState) => state.loading
);

export const getDeletingTipoRelatorioIds = createSelector(
    getTipoRelatoriosState,
    (state: TipoRelatoriosState) => state.deletingTipoRelatorioIds
);

export const getDeletedTipoRelatorioIds = createSelector(
    getTipoRelatoriosState,
    (state: TipoRelatoriosState) => state.deletedTipoRelatorioIds
);

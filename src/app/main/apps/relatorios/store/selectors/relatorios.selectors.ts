import {createSelector} from '@ngrx/store';
import {getRelatoriosAppState, RelatoriosAppState, RelatoriosState} from 'app/main/apps/relatorios/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {relatorio as relatorioSchema} from '@cdk/normalizr';
import {Relatorio} from '@cdk/models/relatorio.model';

const schemaSelectors = createSchemaSelectors<Relatorio>(relatorioSchema);

export const getRelatoriosState: any = createSelector(
    getRelatoriosAppState,
    (state: RelatoriosAppState) => state.relatorios
);

export const getSelectedRelatorioIds: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.selectedRelatorioIds
);

export const getMaximizado: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.maximizado
);

export const getRelatoriosIds: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.entitiesId
);

export const getRelatorios: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRelatoriosIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedRelatorios: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedRelatorioIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.pagination
);

export const getRelatoriosLoaded: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.loading
);

export const getDeletingRelatorioIds: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.deletingRelatorioIds
);

export const getDeletedRelatorioIds: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.deletedRelatorioIds
);

export const getLoadedRelatorioIds: any = createSelector(
    getRelatoriosState,
    (state: RelatoriosState) => state.loadedRelatorioIds
);

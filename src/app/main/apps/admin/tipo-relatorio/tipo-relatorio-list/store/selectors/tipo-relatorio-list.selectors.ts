import {createSelector} from '@ngrx/store';
import {getTipoRelatorioListAppState, TipoRelatorioListAppState, TipoRelatorioListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoRelatorio as tipoRelatorioSchema} from '@cdk/normalizr';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';

const schemaSelectors = createSchemaSelectors<TipoRelatorio>(tipoRelatorioSchema);

export const getTipoRelatorioListState = createSelector(
    getTipoRelatorioListAppState,
    (state: TipoRelatorioListAppState) => state.tipoRelatorioList
);

export const getTipoRelatorioListIds = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.entitiesId
);

export const getTipoRelatorioList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoRelatorioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.pagination
);

export const getTipoRelatorioListLoaded = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getTipoRelatorioListState,
    (state: TipoRelatorioListState) => state.deletingErrors
);

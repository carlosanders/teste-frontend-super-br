import {createSelector} from '@ngrx/store';
import {
    getUnidadesListAppState,
    UnidadesListAppState,
    UnidadesListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getUnidadesListState = createSelector(
    getUnidadesListAppState,
    (state: UnidadesListAppState) => state.unidadesList
);

export const getUnidadesListIds = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.entitiesId
);

export const getUnidadesList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUnidadesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.pagination
);

export const getUnidadesListLoaded = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.loaded
);

export const getIsLoading = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.loading
);

export const getDeletingIds = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.deletingErrors
);

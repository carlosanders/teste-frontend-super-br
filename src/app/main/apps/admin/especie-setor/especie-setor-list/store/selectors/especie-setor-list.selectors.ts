import {createSelector} from '@ngrx/store';
import {
    getEspecieSetorListAppState,
    EspecieSetorListAppState,
    EspecieSetorListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';
import {EspecieSetor} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieSetor>(especieSetorSchema);

export const getEspecieSetorListState = createSelector(
    getEspecieSetorListAppState,
    (state: EspecieSetorListAppState) => state.especieSetorList
);

export const getEspecieSetorListIds = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.entitiesId
);

export const getEspecieSetorList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.pagination
);

export const getEspecieSetorListLoaded = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.loading
);

export const getDeletingIds = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.deletingErrors
);


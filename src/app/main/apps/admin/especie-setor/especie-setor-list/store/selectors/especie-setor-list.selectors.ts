import {createSelector} from '@ngrx/store';
import {EspecieSetorListAppState, EspecieSetorListState, getEspecieSetorListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';
import {EspecieSetor} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieSetor>(especieSetorSchema);

export const getEspecieSetorListState: any = createSelector(
    getEspecieSetorListAppState,
    (state: EspecieSetorListAppState) => state.especieSetorList
);

export const getEspecieSetorListIds: any = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.entitiesId
);

export const getEspecieSetorList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.pagination
);

export const getEspecieSetorListLoaded: any = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getEspecieSetorListState,
    (state: EspecieSetorListState) => state.deletingErrors
);


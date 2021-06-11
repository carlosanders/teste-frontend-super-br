import {createSelector} from '@ngrx/store';
import {getSetorListAppState, SetorListAppState, SetorListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getSetorListState = createSelector(
    getSetorListAppState,
    (state: SetorListAppState) => state.setorList
);

export const getSetorListIds = createSelector(
    getSetorListState,
    (state: SetorListState) => state.entitiesId
);

export const getSetorList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSetorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getSetorListState,
    (state: SetorListState) => state.pagination
);

export const getSetorListLoaded = createSelector(
    getSetorListState,
    (state: SetorListState) => state.loaded
);

export const getIsLoading = createSelector(
    getSetorListState,
    (state: SetorListState) => state.loading
);

export const getDeletingIds = createSelector(
    getSetorListState,
    (state: SetorListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getSetorListState,
    (state: SetorListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getSetorListState,
    (state: SetorListState) => state.deletingErrors
);

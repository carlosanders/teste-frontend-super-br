import {createSelector} from '@ngrx/store';
import {
    getNomeListAppState,
    NomeListAppState,
    NomeListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {nome as nomeSchema} from '@cdk/normalizr';
import {Nome} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Nome>(nomeSchema);

export const getNomeListState = createSelector(
    getNomeListAppState,
    (state: NomeListAppState) => state.nomeList
);

export const getNomeListIds = createSelector(
    getNomeListState,
    (state: NomeListState) => state.entitiesId
);

export const getNomeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getNomeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getNomeListState,
    (state: NomeListState) => state.pagination
);

export const getNomeListLoaded = createSelector(
    getNomeListState,
    (state: NomeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getNomeListState,
    (state: NomeListState) => state.loading
);

export const getDeletingIds = createSelector(
    getNomeListState,
    (state: NomeListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getNomeListState,
    (state: NomeListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getNomeListState,
    (state: NomeListState) => state.deletingErrors
);

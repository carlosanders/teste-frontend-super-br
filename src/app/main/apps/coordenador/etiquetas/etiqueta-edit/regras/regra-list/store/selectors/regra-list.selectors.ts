import {createSelector} from '@ngrx/store';
import {
    getRegraListAppState,
    RegraListAppState,
    RegraListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {regra as regraSchema} from '@cdk/normalizr';
import {Regra} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Regra>(regraSchema);

export const getRegraListState = createSelector(
    getRegraListAppState,
    (state: RegraListAppState) => state.regraList
);

export const getRegraListIds = createSelector(
    getRegraListState,
    (state: RegraListState) => state.entitiesId
);

export const getRegraList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRegraListIds,
    schemaSelectors.entitiesProjector
);

export const getRegraListLoaded = createSelector(
    getRegraListState,
    (state: RegraListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRegraListState,
    (state: RegraListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRegraListState,
    (state: RegraListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRegraListState,
    (state: RegraListState) => state.deletedIds
);

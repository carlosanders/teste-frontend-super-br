import {createSelector} from '@ngrx/store';
import {getVolumeListAppState, VolumeListAppState, VolumeListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {volume as volumeSchema} from '@cdk/normalizr';
import {Volume} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Volume>(volumeSchema);

export const getVolumeListState = createSelector(
    getVolumeListAppState,
    (state: VolumeListAppState) => state.volumeList
);

export const getVolumeListIds = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.entitiesId
);

export const getVolumeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVolumeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.pagination
);

export const getVolumeListLoaded = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.loading
);

export const getDeletingIds = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.deletingErrors
);

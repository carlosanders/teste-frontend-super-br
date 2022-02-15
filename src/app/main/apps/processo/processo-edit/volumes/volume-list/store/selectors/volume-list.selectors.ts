import {createSelector} from '@ngrx/store';
import {getVolumeListAppState, VolumeListAppState, VolumeListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {volume as volumeSchema} from '@cdk/normalizr';
import {Volume} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Volume>(volumeSchema);

export const getVolumeListState: any = createSelector(
    getVolumeListAppState,
    (state: VolumeListAppState) => state.volumeList
);

export const getVolumeListIds: any = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.entitiesId
);

export const getVolumeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVolumeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.pagination
);

export const getVolumeListLoaded: any = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getVolumeListState,
    (state: VolumeListState) => state.deletingErrors
);

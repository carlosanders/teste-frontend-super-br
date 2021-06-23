import {createSelector} from '@ngrx/store';
import {FolderListAppState, FolderListState, getFolderListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFolderListState = createSelector(
    getFolderListAppState,
    (state: FolderListAppState) => state.folderList
);

export const getFolderListIds = createSelector(
    getFolderListState,
    (state: FolderListState) => state.entitiesId
);

export const getFolderList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFolderListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getFolderListState,
    (state: FolderListState) => state.pagination
);

export const getFolderListLoaded = createSelector(
    getFolderListState,
    (state: FolderListState) => state.loaded
);

export const getIsLoading = createSelector(
    getFolderListState,
    (state: FolderListState) => state.loading
);

export const getDeletingIds = createSelector(
    getFolderListState,
    (state: FolderListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getFolderListState,
    (state: FolderListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getFolderListState,
    (state: FolderListState) => state.deletingErrors
);

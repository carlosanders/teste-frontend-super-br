import {createSelector} from '@ngrx/store';
import {FolderListAppState, FolderListState, getFolderListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFolderListState: any = createSelector(
    getFolderListAppState,
    (state: FolderListAppState) => state.folderList
);

export const getFolderListIds: any = createSelector(
    getFolderListState,
    (state: FolderListState) => state.entitiesId
);

export const getFolderList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFolderListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getFolderListState,
    (state: FolderListState) => state.pagination
);

export const getFolderListLoaded: any = createSelector(
    getFolderListState,
    (state: FolderListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getFolderListState,
    (state: FolderListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getFolderListState,
    (state: FolderListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getFolderListState,
    (state: FolderListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getFolderListState,
    (state: FolderListState) => state.deletingErrors
);

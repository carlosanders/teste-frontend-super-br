import {createSelector} from '@ngrx/store';
import {FoldersState, getBoardTarefasAppState, BoardTarefasAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFoldersState = createSelector(
    getBoardTarefasAppState,
    (state: BoardTarefasAppState) => state.folders
);

export const getFoldersIds = createSelector(
    getFoldersState,
    (state: FoldersState) => state.entitiesId
);

export const getFolders = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFoldersIds,
    schemaSelectors.entitiesProjector
);

export const getFoldersLoaded = createSelector(
    getFoldersState,
    (state: FoldersState) => state.loaded
);

export const getFolderIsSaving = createSelector(
    getFoldersState,
    (state: FoldersState) => state.saving
);

export const getFolderErrors = createSelector(
    getFoldersState,
    (state: FoldersState) => state.errors
);

export const getFolderDeletingIds = createSelector(
    getFoldersState,
    (state: FoldersState) => state.deletingIds
);

export const getFolderDeletedIds = createSelector(
    getFoldersState,
    (state: FoldersState) => state.deletedIds
);

export const getIsLoadingFolder = createSelector(
    getFoldersState,
    (state: FoldersState) => state.loading
);

export const getFolderPagination = createSelector(
    getFoldersState,
    (state: FoldersState) => state.pagination
);

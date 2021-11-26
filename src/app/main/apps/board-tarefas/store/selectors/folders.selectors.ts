import {createSelector} from '@ngrx/store';
import {FoldersState, getBoardTarefasAppState, BoardTarefasAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFoldersState: any = createSelector(
    getBoardTarefasAppState,
    (state: BoardTarefasAppState) => state.folders
);

export const getFoldersIds: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.entitiesId
);

export const getFolders: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFoldersIds,
    schemaSelectors.entitiesProjector
);

export const getFoldersLoaded: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.loaded
);

export const getFolderIsSaving: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.saving
);

export const getFolderErrors: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.errors
);

export const getFolderDeletingIds: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.deletingIds
);

export const getFolderDeletedIds: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.deletedIds
);

export const getIsLoadingFolder: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.loading
);

export const getFolderPagination: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.pagination
);

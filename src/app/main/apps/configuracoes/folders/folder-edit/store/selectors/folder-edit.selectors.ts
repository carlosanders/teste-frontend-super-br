import {createSelector} from '@ngrx/store';
import {FolderEditAppState, FolderEditState, getFolderEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Folder} from '@cdk/models';
import {folder as folderSchema} from '@cdk/normalizr';

const schemaFolderSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFolderEditState = createSelector(
    getFolderEditAppState,
    (state: FolderEditAppState) => state.folder
);

export const getFolderId = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.loaded ? state.loaded.value : null
);

export const getFolder = createSelector(
    schemaFolderSelectors.getNormalizedEntities,
    getFolderId,
    schemaFolderSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.loaded
);

export const getErrors = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.errors
);

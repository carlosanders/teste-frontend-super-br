import {createSelector} from '@ngrx/store';
import {FolderEditAppState, FolderEditState, getFolderEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Folder} from '@cdk/models';
import {folder as folderSchema} from '@cdk/normalizr';

const schemaFolderSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFolderEditState: any = createSelector(
    getFolderEditAppState,
    (state: FolderEditAppState) => state.folder
);

export const getFolderId: any = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.loaded ? state.loaded.value : null
);

export const getFolder: any = createSelector(
    schemaFolderSelectors.getNormalizedEntities,
    getFolderId,
    schemaFolderSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getFolderEditState,
    (state: FolderEditState) => state.errors
);

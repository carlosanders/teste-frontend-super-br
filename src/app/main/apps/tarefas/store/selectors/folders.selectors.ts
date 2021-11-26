import {createSelector} from '@ngrx/store';
import {FoldersState, getTarefasAppState, TarefasAppState} from 'app/main/apps/tarefas/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFoldersState: any = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.folders
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

export const getIsSaving: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.saving
);

export const getErrors: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.errors
);

export const getDeletingIds: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.deletedIds
);

export const getIsLoadingFolder: any = createSelector(
    getFoldersState,
    (state: FoldersState) => state.loading
);

import {createSelector} from '@ngrx/store';
import {FoldersState, getTarefasAppState, TarefasAppState} from 'app/main/apps/tarefas/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr/folder.schema';
import {Folder} from '@cdk/models/folder.model';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFoldersState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.folders
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

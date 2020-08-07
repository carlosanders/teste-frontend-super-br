import {createSelector} from '@ngrx/store';
import {FoldersState, getRelatoriosAppState, RelatoriosAppState} from 'app/main/apps/relatorios/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFoldersState = createSelector(
    getRelatoriosAppState,
    (state: RelatoriosAppState) => state.folders
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

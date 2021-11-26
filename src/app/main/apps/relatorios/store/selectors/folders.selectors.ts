import {createSelector} from '@ngrx/store';
import {FoldersState, getRelatoriosAppState, RelatoriosAppState} from 'app/main/apps/relatorios/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {folder as folderSchema} from '@cdk/normalizr';
import {Folder} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Folder>(folderSchema);

export const getFoldersState: any = createSelector(
    getRelatoriosAppState,
    (state: RelatoriosAppState) => state.folders
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

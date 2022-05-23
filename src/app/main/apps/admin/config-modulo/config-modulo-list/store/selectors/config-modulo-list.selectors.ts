import {createSelector} from '@ngrx/store';
import {
    getConfigModuleListAppState,
    ConfigModuleListAppState,
    ConfigModuleListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {configModule as configModuleSchema} from '../../../../../../../../@cdk/normalizr';
import {ConfigModulo} from '../../../../../../../../@cdk/models';

const schemaSelectors = createSchemaSelectors<ConfigModulo>(configModuleSchema);

export const getConfigModuleListState : any = createSelector(
    getConfigModuleListAppState,
    (state: ConfigModuleListAppState) => state.configModuleList
);

export const getConfigModuleListIds : any = createSelector(
    getConfigModuleListState,
    (state: ConfigModuleListState) => state.entitiesId
);

export const getConfigModuleList : any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getConfigModuleListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination : any = createSelector(
    getConfigModuleListState,
    (state: ConfigModuleListState) => state.pagination
);

export const getConfigModuleListLoaded : any = createSelector(
    getConfigModuleListState,
    (state: ConfigModuleListState) => state.loaded
);

export const getIsLoading : any = createSelector(
    getConfigModuleListState,
    (state: ConfigModuleListState) => state.loading
);

export const getDeletingIds : any = createSelector(
    getConfigModuleListState,
    (state: ConfigModuleListState) => state.deletingIds
);

export const getDeletedIds : any = createSelector(
    getConfigModuleListState,
    (state: ConfigModuleListState) => state.deletedIds
);

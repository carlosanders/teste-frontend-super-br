import {createSelector} from '@ngrx/store';
import {
    getConfigModuleListAppState,
    ConfigModuleListAppState,
    ConfigModuleListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modulo as ModuloSchema} from '../../../../../../../../@cdk/normalizr';
import {Modulo} from '../../../../../../../../@cdk/models';

const schemaSelectors = createSchemaSelectors<Modulo>(ModuloSchema);

export const getModuloListState : any = createSelector(
    getConfigModuleListAppState,
    (state: ConfigModuleListAppState) => state.moduloList
);

export const getModuloListIds : any = createSelector(
    getModuloListState,
    (state: ConfigModuleListState) => state.entitiesId
);

export const getModuloList : any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getModuloListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination : any = createSelector(
    getModuloListState,
    (state: ConfigModuleListState) => state.pagination
);

export const getModuloListLoaded : any = createSelector(
    getModuloListState,
    (state: ConfigModuleListState) => state.loaded
);

export const getIsLoading : any = createSelector(
    getModuloListState,
    (state: ConfigModuleListState) => state.loading
);

export const getDeletingIds : any = createSelector(
    getModuloListState,
    (state: ConfigModuleListState) => state.deletingIds
);

export const getDeletedIds : any = createSelector(
    getModuloListState,
    (state: ConfigModuleListState) => state.deletedIds
);

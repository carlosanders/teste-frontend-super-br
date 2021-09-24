import {createSelector} from '@ngrx/store';
import {RolesListAppState, RolesListState, getRolesListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoRole as roleschema} from '@cdk/normalizr';
import {VinculacaoRole} from '@cdk/models/vinculacao-role.model';

const schemaSelectors = createSchemaSelectors<VinculacaoRole>(roleschema);

export const getRolesListState = createSelector(
    getRolesListAppState,
    (state: RolesListAppState) => state.rolesList
);

export const getRolesListIds = createSelector(
    getRolesListState,
    (state: RolesListState) => state.entitiesId
);

export const getRolesList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRolesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRolesListState,
    (state: RolesListState) => state.pagination
);

export const getRolesListLoaded = createSelector(
    getRolesListState,
    (state: RolesListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRolesListState,
    (state: RolesListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRolesListState,
    (state: RolesListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRolesListState,
    (state: RolesListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getRolesListState,
    (state: RolesListState) => state.deletingErrors
);

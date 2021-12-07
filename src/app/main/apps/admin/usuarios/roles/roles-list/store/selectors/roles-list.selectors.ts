import {createSelector} from '@ngrx/store';
import {RolesListAppState, RolesListState, getRolesListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoRole as roleschema} from '@cdk/normalizr';
import {VinculacaoRole} from '@cdk/models/vinculacao-role.model';

const schemaSelectors = createSchemaSelectors<VinculacaoRole>(roleschema);

export const getRolesListState: any = createSelector(
    getRolesListAppState,
    (state: RolesListAppState) => state.rolesList
);

export const getRolesListIds: any = createSelector(
    getRolesListState,
    (state: RolesListState) => state.entitiesId
);

export const getRolesList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRolesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRolesListState,
    (state: RolesListState) => state.pagination
);

export const getRolesListLoaded: any = createSelector(
    getRolesListState,
    (state: RolesListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRolesListState,
    (state: RolesListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRolesListState,
    (state: RolesListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRolesListState,
    (state: RolesListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRolesListState,
    (state: RolesListState) => state.deletingErrors
);

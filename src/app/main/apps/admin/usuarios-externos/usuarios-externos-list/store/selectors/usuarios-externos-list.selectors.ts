import {createSelector} from '@ngrx/store';
import {getUsuariosExternosListAppState, UsuariosExternosListAppState, UsuariosExternosListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {Usuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuariosExternosListState = createSelector(
    getUsuariosExternosListAppState,
    (state: UsuariosExternosListAppState) => state.usuariosExternosList
);

export const getUsuariosExternosListIds = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.entitiesId
);

export const getUsuariosExternosList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUsuariosExternosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.pagination
);

export const getUsuariosExternosListLoaded = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.loaded
);

export const getIsLoading = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.loading
);

export const getDeletingIds = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.deletedIds
);

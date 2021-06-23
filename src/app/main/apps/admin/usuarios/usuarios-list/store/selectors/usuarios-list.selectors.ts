import {createSelector} from '@ngrx/store';
import {getUsuariosListAppState, UsuariosListAppState, UsuariosListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {Usuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuariosListState = createSelector(
    getUsuariosListAppState,
    (state: UsuariosListAppState) => state.usuariosList
);

export const getUsuariosListIds = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.entitiesId
);

export const getUsuariosList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUsuariosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.pagination
);

export const getUsuariosListLoaded = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.loaded
);

export const getIsLoading = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.loading
);

export const getDeletingIds = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.deletingErrors
);

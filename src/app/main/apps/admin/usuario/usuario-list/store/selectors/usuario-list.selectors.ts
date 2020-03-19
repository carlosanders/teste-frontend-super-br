import {createSelector} from '@ngrx/store';
import {
    getUsuarioListAppState,
    UsuarioListAppState,
    UsuarioListState
} from "../reducers";

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr/usuario.schema';
import {Usuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuarioListState = createSelector(
    getUsuarioListAppState,
    (state: UsuarioListAppState) => state.usuarioList
);

export const getUsuarioListIds = createSelector(
    getUsuarioListState,
    (state: UsuarioListState) => state.entitiesId
);

export const getUsuarioList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUsuarioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getUsuarioListState,
    (state: UsuarioListState) => state.pagination
);

export const getUsuarioListLoaded = createSelector(
    getUsuarioListState,
    (state: UsuarioListState) => state.loaded
);

export const getIsLoading = createSelector(
    getUsuarioListState,
    (state: UsuarioListState) => state.loading
);

export const getDeletingIds = createSelector(
    getUsuarioListState,
    (state: UsuarioListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getUsuarioListState,
    (state: UsuarioListState) => state.deletedIds
);
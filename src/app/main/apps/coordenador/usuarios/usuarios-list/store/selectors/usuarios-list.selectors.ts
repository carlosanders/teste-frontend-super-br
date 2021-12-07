import {createSelector} from '@ngrx/store';
import {getUsuariosListAppState, UsuariosListAppState, UsuariosListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {Usuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuariosListState: any = createSelector(
    getUsuariosListAppState,
    (state: UsuariosListAppState) => state.usuariosList
);

export const getUsuariosListIds: any = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.entitiesId
);

export const getUsuariosList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUsuariosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.pagination
);

export const getUsuariosListLoaded: any = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getUsuariosListState,
    (state: UsuariosListState) => state.deletingErrors
);

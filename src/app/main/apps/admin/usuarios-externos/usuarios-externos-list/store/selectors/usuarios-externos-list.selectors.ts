import {createSelector} from '@ngrx/store';
import {getUsuariosExternosListAppState, UsuariosExternosListAppState, UsuariosExternosListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {usuario as usuarioSchema} from '@cdk/normalizr';
import {Usuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Usuario>(usuarioSchema);

export const getUsuariosExternosListState: any = createSelector(
    getUsuariosExternosListAppState,
    (state: UsuariosExternosListAppState) => state.usuariosExternosList
);

export const getUsuariosExternosListIds: any = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.entitiesId
);

export const getUsuariosExternosList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUsuariosExternosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.pagination
);

export const getUsuariosExternosListLoaded: any = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getUsuariosExternosListState,
    (state: UsuariosExternosListState) => state.loading
);

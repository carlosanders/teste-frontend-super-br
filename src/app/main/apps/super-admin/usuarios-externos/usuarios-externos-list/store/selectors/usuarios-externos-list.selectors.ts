import {createSelector} from '@ngrx/store';
import {
    getUsuariosExternosListAppState,
    UsuariosExternosListAppState,
    UsuariosExternosListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr/especie-tarefa.schema';
import {Usuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Usuario>(especieTarefaSchema);

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

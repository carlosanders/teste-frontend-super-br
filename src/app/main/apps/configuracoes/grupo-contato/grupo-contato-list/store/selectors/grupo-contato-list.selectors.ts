import {createSelector} from '@ngrx/store';
import {
    getGrupoContatoListAppState,
    GrupoContatoListAppState,
    GrupoContatoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';
import {GrupoContato} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<GrupoContato>(grupoContatoSchema);

export const getGrupoContatoListState = createSelector(
    getGrupoContatoListAppState,
    (state: GrupoContatoListAppState) => state.grupoContatoList
);

export const getGrupoContatoListIds = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.entitiesId
);

export const getGrupoContatoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getGrupoContatoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.pagination
);

export const getGrupoContatoListLoaded = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.deletingErrors
);

import {createSelector} from '@ngrx/store';
import {getGrupoContatoListAppState, GrupoContatoListAppState, GrupoContatoListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';
import {GrupoContato} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<GrupoContato>(grupoContatoSchema);

export const getGrupoContatoListState: any = createSelector(
    getGrupoContatoListAppState,
    (state: GrupoContatoListAppState) => state.grupoContatoList
);

export const getGrupoContatoListIds: any = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.entitiesId
);

export const getGrupoContatoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getGrupoContatoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.pagination
);

export const getGrupoContatoListLoaded: any = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getGrupoContatoListState,
    (state: GrupoContatoListState) => state.deletingErrors
);

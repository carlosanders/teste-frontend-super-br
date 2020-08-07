import {createSelector} from '@ngrx/store';
import {
    getUnidadesOrgaoCentralListAppState,
    UnidadesOrgaoCentralListAppState,
    UnidadesOrgaoCentralListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getUnidadesListState = createSelector(
    getUnidadesOrgaoCentralListAppState,
    (state: UnidadesOrgaoCentralListAppState) => state.unidades
);

export const getUnidadesListIds = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.entitiesId
);

export const getUnidadesList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUnidadesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.pagination
);

export const getUnidadesListLoaded = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.loaded
);

export const getIsLoading = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.loading
);

export const getDeletingIds = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.deletedIds
);

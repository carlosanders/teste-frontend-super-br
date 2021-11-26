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

export const getUnidadesListState: any = createSelector(
    getUnidadesOrgaoCentralListAppState,
    (state: UnidadesOrgaoCentralListAppState) => state.unidades
);

export const getUnidadesListIds: any = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.entitiesId
);

export const getUnidadesList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUnidadesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.pagination
);

export const getUnidadesListLoaded: any = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getUnidadesListState,
    (state: UnidadesOrgaoCentralListState) => state.deletingErrors
);

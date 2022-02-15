import {createSelector} from '@ngrx/store';
import {getUnidadesListAppState, UnidadesListAppState, UnidadesListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';

const schemaSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getUnidadesListState: any = createSelector(
    getUnidadesListAppState,
    (state: UnidadesListAppState) => state.unidadesList
);

export const getUnidadesListIds: any = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.entitiesId
);

export const getUnidadesList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getUnidadesListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.pagination
);

export const getUnidadesListLoaded: any = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getUnidadesListState,
    (state: UnidadesListState) => state.deletingErrors
);

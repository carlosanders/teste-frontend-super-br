import {createSelector} from '@ngrx/store';
import {CoordenadoresListAppState, CoordenadoresListState, getCoordenadoresListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {coordenador as coordenadoreschema} from '@cdk/normalizr';
import {Coordenador} from '@cdk/models/coordenador.model';

const schemaSelectors = createSchemaSelectors<Coordenador>(coordenadoreschema);

export const getCoordenadoresListState = createSelector(
    getCoordenadoresListAppState,
    (state: CoordenadoresListAppState) => state.coordenadoresList
);

export const getCoordenadoresListIds = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.entitiesId
);

export const getCoordenadoresList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCoordenadoresListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.pagination
);

export const getCoordenadoresListLoaded = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.loaded
);

export const getIsLoading = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.loading
);

export const getDeletingIds = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getCoordenadoresListState,
    (state: CoordenadoresListState) => state.deletingErrors
);

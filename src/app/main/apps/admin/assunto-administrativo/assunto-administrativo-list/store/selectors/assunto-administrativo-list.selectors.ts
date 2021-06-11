import {createSelector} from '@ngrx/store';
import {
    AssuntoAdministrativoListAppState,
    AssuntoAdministrativoListState,
    getAssuntoAdministrativoListAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr';
import {AssuntoAdministrativo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<AssuntoAdministrativo>(assuntoAdministrativoSchema);

export const getAssuntoAdministrativoListState = createSelector(
    getAssuntoAdministrativoListAppState,
    (state: AssuntoAdministrativoListAppState) => state.assuntoAdministrativoList
);

export const getAssuntoAdministrativoListIds = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.entitiesId
);

export const getAssuntoAdministrativoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntoAdministrativoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.pagination
);

export const getAssuntoAdministrativoListLoaded = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.loading
);

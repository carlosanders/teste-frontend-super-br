import {createSelector} from '@ngrx/store';
import {
    getAssuntoAdministrativoListAppState,
    AssuntoAdministrativoListAppState,
    AssuntoAdministrativoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr/assunto-administrativo.schema';
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

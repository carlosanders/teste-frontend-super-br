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

export const getAssuntoAdministrativoListState: any = createSelector(
    getAssuntoAdministrativoListAppState,
    (state: AssuntoAdministrativoListAppState) => state.assuntoAdministrativoList
);

export const getAssuntoAdministrativoListIds: any = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.entitiesId
);

export const getAssuntoAdministrativoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntoAdministrativoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.pagination
);

export const getAssuntoAdministrativoListLoaded: any = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAssuntoAdministrativoListState,
    (state: AssuntoAdministrativoListState) => state.loading
);

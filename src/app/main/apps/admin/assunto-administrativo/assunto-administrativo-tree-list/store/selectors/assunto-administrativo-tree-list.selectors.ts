import {createSelector} from '@ngrx/store';
import {
    AssuntoAdministrativoTreeListAppState,
    AssuntoAdministrativoTreeListState,
    getAssuntoAdministrativoTreeListAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr';
import {AssuntoAdministrativo} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<AssuntoAdministrativo>(assuntoAdministrativoSchema);

export const getAssuntoAdministrativoTreeListState: any = createSelector(
    getAssuntoAdministrativoTreeListAppState,
    (state: AssuntoAdministrativoTreeListAppState) => state.assuntoAdministrativoTreeList
);

export const getAssuntoAdministrativoTreeListIds: any = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.entitiesId
);

export const getAssuntoAdministrativoTreeList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntoAdministrativoTreeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.pagination
);

export const getAssuntoAdministrativoTreeListLoaded: any = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.loading
);

export const getIsSaving: any = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.loaded
);

export const getErrors: any = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.errors
);


import {createSelector} from '@ngrx/store';
import {
    getAssuntoAdministrativoTreeListAppState,
    AssuntoAdministrativoTreeListAppState,
    AssuntoAdministrativoTreeListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {assuntoAdministrativo as assuntoAdministrativoSchema} from '@cdk/normalizr/assunto-administrativo.schema';
import {AssuntoAdministrativo} from '@cdk/models';
import {AssuntoAdministrativoEditState} from '../../../assunto-administrativo-edit/store/reducers';
import {getAssuntoAdministrativoEditState} from '../../../assunto-administrativo-edit/store/selectors';

const schemaSelectors = createSchemaSelectors<AssuntoAdministrativo>(assuntoAdministrativoSchema);

export const getAssuntoAdministrativoTreeListState = createSelector(
    getAssuntoAdministrativoTreeListAppState,
    (state: AssuntoAdministrativoTreeListAppState) => state.assuntoAdministrativoTreeList
);

export const getAssuntoAdministrativoTreeListIds = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.entitiesId
);

export const getAssuntoAdministrativoTreeList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAssuntoAdministrativoTreeListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.pagination
);

export const getAssuntoAdministrativoTreeListLoaded = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.loading
);

export const getIsSaving = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.saving
);

export const getHasLoaded = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.loaded
);

export const getErrors = createSelector(
    getAssuntoAdministrativoTreeListState,
    (state: AssuntoAdministrativoTreeListState) => state.errors
);


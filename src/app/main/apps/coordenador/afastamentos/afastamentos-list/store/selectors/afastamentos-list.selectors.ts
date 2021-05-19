import {createSelector} from '@ngrx/store';
import {
    getAfastamentosListAppState,
    AfastamentosListAppState,
    AfastamentosListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {Afastamento} from '@cdk/models/afastamento.model';

const schemaSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);

export const getAfastamentosListState = createSelector(
    getAfastamentosListAppState,
    (state: AfastamentosListAppState) => state.afastamentosList
);

export const getAfastamentosListIds = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.entitiesId
);

export const getAfastamentosList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAfastamentosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.pagination
);

export const getAfastamentosListLoaded = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.loading
);

export const getDeletingIds = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.deletingErrors
);

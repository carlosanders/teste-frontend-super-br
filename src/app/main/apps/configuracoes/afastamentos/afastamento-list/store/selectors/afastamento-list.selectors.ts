import {createSelector} from '@ngrx/store';
import {
    getAfastamentoListAppState,
    AfastamentoListAppState,
    AfastamentoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {afastamento as afastamentoSchema} from '@cdk/normalizr/afastamento.schema';
import {Afastamento} from '@cdk/models/afastamento.model';

const schemaSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);

export const getAfastamentoListState = createSelector(
    getAfastamentoListAppState,
    (state: AfastamentoListAppState) => state.afastamentoList
);

export const getAfastamentoListIds = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.entitiesId
);

export const getAfastamentoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAfastamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.pagination
);

export const getAfastamentoListLoaded = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.deletedIds
);

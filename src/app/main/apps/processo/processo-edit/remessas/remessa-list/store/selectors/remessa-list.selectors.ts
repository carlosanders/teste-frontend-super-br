import {createSelector} from '@ngrx/store';
import {
    getRemessaListAppState,
    RemessaListAppState,
    RemessaListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr/tramitacao.schema';
import {Tramitacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getRemessaListState = createSelector(
    getRemessaListAppState,
    (state: RemessaListAppState) => state.remessaList
);

export const getRemessaListIds = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.entitiesId
);

export const getRemessaList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRemessaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.pagination
);

export const getRemessaListLoaded = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.deletedIds
);

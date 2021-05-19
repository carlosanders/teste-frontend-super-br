import {createSelector} from '@ngrx/store';
import {
    getAcompanhamentoListAppState,
    AcompanhamentoListAppState,
    AcompanhamentoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {compartilhamento as acompanhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Compartilhamento>(acompanhamentoSchema);

export const getAcompanhamentoListState = createSelector(
    getAcompanhamentoListAppState,
    (state: AcompanhamentoListAppState) => state.acompanhamentoList
);

export const getAcompanhamentoListIds = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.entitiesId
);

export const getAcompanhamentoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcompanhamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.pagination
);

export const getAcompanhamentoListLoaded = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getAcompanhamentoListState,
    (state: AcompanhamentoListState) => state.deletingErrors
);

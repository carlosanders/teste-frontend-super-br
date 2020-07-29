import {createSelector} from '@ngrx/store';
import {
    getTramitacaoListAppState,
    TramitacaoListAppState,
    TramitacaoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getTramitacaoListState = createSelector(
    getTramitacaoListAppState,
    (state: TramitacaoListAppState) => state.tramitacaoList
);

export const getTramitacaoListIds = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.entitiesId
);

export const getTramitacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTramitacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.pagination
);

export const getTramitacaoListLoaded = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getTramitacaoListState,
    (state: TramitacaoListState) => state.deletedIds
);

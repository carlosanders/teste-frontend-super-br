import {createSelector} from '@ngrx/store';
import {
    getAcaoListAppState,
    AcaoListAppState,
    AcaoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {acao as acaoSchema} from '@cdk/normalizr';
import {Acao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Acao>(acaoSchema);

export const getAcaoListState = createSelector(
    getAcaoListAppState,
    (state: AcaoListAppState) => state.acaoList
);

export const getAcaoListIds = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.entitiesId
);

export const getAcaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcaoListIds,
    schemaSelectors.entitiesProjector
);

export const getAcaoListLoaded = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getAcaoListState,
    (state: AcaoListState) => state.deletedIds
);

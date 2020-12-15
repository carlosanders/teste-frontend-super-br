import {createSelector} from '@ngrx/store';
import {
    getAcaoTransicaoWorkflowListAppState,
    AcaoTransicaoWorkflowListAppState,
    AcaoTransicaoWorkflowListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {acao as acaoSchema} from '@cdk/normalizr';
import {Acao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Acao>(acaoSchema);

export const getAcaoTransicaoWorkflowListState = createSelector(
    getAcaoTransicaoWorkflowListAppState,
    (state: AcaoTransicaoWorkflowListAppState) => state.acaoList
);

export const getAcaoListIds = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.entitiesId
);

export const getAcaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcaoListIds,
    schemaSelectors.entitiesProjector
);

export const getAcaoListLoaded = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.loaded
);

export const getIsLoading = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.loading
);

export const getDeletingIds = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.deletedIds
);

import {createSelector} from '@ngrx/store';
import {
    AcaoTransicaoWorkflowListAppState,
    AcaoTransicaoWorkflowListState,
    getAcaoTransicaoWorkflowListAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {acaoTransicaoWorkflow as acaoSchema} from '@cdk/normalizr';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';

const schemaSelectors = createSchemaSelectors<AcaoTransicaoWorkflow>(acaoSchema);

export const getAcaoTransicaoWorkflowListState = createSelector(
    getAcaoTransicaoWorkflowListAppState,
    (state: AcaoTransicaoWorkflowListAppState) => state.acaoTransicaoWorkflowList
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

export const getDeletingErrors = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.deletingErrors
);

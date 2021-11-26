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

export const getAcaoTransicaoWorkflowListState: any = createSelector(
    getAcaoTransicaoWorkflowListAppState,
    (state: AcaoTransicaoWorkflowListAppState) => state.acaoTransicaoWorkflowList
);

export const getAcaoListIds: any = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.entitiesId
);

export const getAcaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAcaoListIds,
    schemaSelectors.entitiesProjector
);

export const getAcaoListLoaded: any = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getAcaoTransicaoWorkflowListState,
    (state: AcaoTransicaoWorkflowListState) => state.deletingErrors
);

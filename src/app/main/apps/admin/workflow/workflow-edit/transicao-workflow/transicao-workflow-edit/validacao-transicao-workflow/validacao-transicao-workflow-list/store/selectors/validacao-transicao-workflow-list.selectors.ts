import {createSelector} from '@ngrx/store';
import {
    getValidacaoTransicaoWorkflowListAppState,
    ValidacaoTransicaoWorkflowListAppState,
    ValidacaoTransicaoWorkflowListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {validacaoTransicaoWorkflow as validacaoSchema} from '@cdk/normalizr';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';

const schemaSelectors = createSchemaSelectors<ValidacaoTransicaoWorkflow>(validacaoSchema);

export const getValidacaoTransicaoWorkflowListState = createSelector(
    getValidacaoTransicaoWorkflowListAppState,
    (state: ValidacaoTransicaoWorkflowListAppState) => state.validacaoTransicaoWorkflowList
);

export const getValidacaoListIds = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.entitiesId
);

export const getValidacaoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getValidacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getValidacaoListLoaded = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.loaded
);

export const getIsLoading = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.loading
);

export const getDeletingIds = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.deletingErrors
);

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

export const getValidacaoTransicaoWorkflowListState: any = createSelector(
    getValidacaoTransicaoWorkflowListAppState,
    (state: ValidacaoTransicaoWorkflowListAppState) => state.validacaoTransicaoWorkflowList
);

export const getValidacaoListIds: any = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.entitiesId
);

export const getValidacaoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getValidacaoListIds,
    schemaSelectors.entitiesProjector
);

export const getValidacaoListLoaded: any = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getValidacaoTransicaoWorkflowListState,
    (state: ValidacaoTransicaoWorkflowListState) => state.deletingErrors
);

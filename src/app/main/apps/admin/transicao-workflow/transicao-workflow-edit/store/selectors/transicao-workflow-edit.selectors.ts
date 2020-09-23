import {createSelector} from '@ngrx/store';
import {getTransicaoWorkflowEditAppState, TransicaoWorkflowEditAppState, TransicaoWorkflowEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr/index';
import {Workflow} from '../../../../../../../../@cdk/models';

const schemaTransicaoWorkflowSelectors = createSchemaSelectors<Workflow>(transicaoWorkflowSchema);

export const getTransicaoWorkflowEditState = createSelector(
    getTransicaoWorkflowEditAppState,
    (state: TransicaoWorkflowEditAppState) => state.transicaoWorkflow
);

export const getWorkflowId = createSelector(
    getTransicaoWorkflowEditState,
    (state: TransicaoWorkflowEditState) => state.entityId
);

export const getTransicaoWorkflow = createSelector(
    schemaTransicaoWorkflowSelectors.getNormalizedEntities,
    getWorkflowId,
    schemaTransicaoWorkflowSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTransicaoWorkflowEditState,
    (state: TransicaoWorkflowEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTransicaoWorkflowEditState,
    (state: TransicaoWorkflowEditState) => state.loaded
);

export const getErrors = createSelector(
    getTransicaoWorkflowEditState,
    (state: TransicaoWorkflowEditState) => state.errors
);

import {createSelector} from '@ngrx/store';
import {getTransicaoWorkflowEditAppState, TransicaoWorkflowEditAppState, TransicaoWorkflowEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {TransicaoWorkflow} from '@cdk/models';

const schemaTransicaoWorkflowSelectors = createSchemaSelectors<TransicaoWorkflow>(transicaoWorkflowSchema);

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

export const getHasLoaded = createSelector(
    getTransicaoWorkflowEditState,
    (state: TransicaoWorkflowEditState) => state.loaded
);

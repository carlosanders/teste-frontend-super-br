import {createSelector} from '@ngrx/store';
import {getTransicaoWorkflowEditAppState, TransicaoWorkflowEditAppState, TransicaoWorkflowEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {transicaoWorkflow as transicaoWorkflowSchema} from '@cdk/normalizr';
import {TransicaoWorkflow} from '@cdk/models';

const schemaTransicaoWorkflowSelectors = createSchemaSelectors<TransicaoWorkflow>(transicaoWorkflowSchema);

export const getTransicaoWorkflowEditState: any = createSelector(
    getTransicaoWorkflowEditAppState,
    (state: TransicaoWorkflowEditAppState) => state.transicaoWorkflow
);

export const getWorkflowId: any = createSelector(
    getTransicaoWorkflowEditState,
    (state: TransicaoWorkflowEditState) => state.entityId
);

export const getTransicaoWorkflow: any = createSelector(
    schemaTransicaoWorkflowSelectors.getNormalizedEntities,
    getWorkflowId,
    schemaTransicaoWorkflowSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getTransicaoWorkflowEditState,
    (state: TransicaoWorkflowEditState) => state.loaded
);

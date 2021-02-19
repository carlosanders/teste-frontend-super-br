import {createSelector} from '@ngrx/store';
import {TipoAcaoWorkflowAppState, TipoAcaoWorkflowState, getAcaoTriggerAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {tipoAcaoWorkflow as schema} from '@cdk/normalizr';

const schemaTipoAcaoWorkflowSelectors = createSchemaSelectors<TipoAcaoWorkflow>(schema);

export const getTipoAcaoWorkflowState = createSelector(
    getAcaoTriggerAppState,
    (state: TipoAcaoWorkflowAppState) => state.tipoAcaoWorkflow
);

export const getTipoAcaoWorkflowId = createSelector(
    getTipoAcaoWorkflowState,
    (state: TipoAcaoWorkflowState) => state.loaded ? state.entityId : null
);

export const getTipoAcaoWorkflow = createSelector(
    schemaTipoAcaoWorkflowSelectors.getNormalizedEntities,
    getTipoAcaoWorkflowId,
    schemaTipoAcaoWorkflowSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getTipoAcaoWorkflowState,
    (state: TipoAcaoWorkflowState) => state.loaded
);

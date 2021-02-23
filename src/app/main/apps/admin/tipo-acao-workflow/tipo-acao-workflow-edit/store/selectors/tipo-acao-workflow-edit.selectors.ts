import {createSelector} from '@ngrx/store';
import {getTipoAcaoWorkflowEditAppState, TipoAcaoWorkflowEditAppState, TipoAcaoWorkflowEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';

const schemaTipoAcaoWorkflowSelectors = createSchemaSelectors<TipoAcaoWorkflow>(tipoAcaoWorkflowSchema);

export const getTipoAcaoWorkflowEditState = createSelector(
    getTipoAcaoWorkflowEditAppState,
    (state: TipoAcaoWorkflowEditAppState) => state.tipoAcaoWorkflow
);

export const getTipoAcaoWorkflowId = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.entityId
);

export const getTipoAcaoWorkflow = createSelector(
    schemaTipoAcaoWorkflowSelectors.getNormalizedEntities,
    getTipoAcaoWorkflowId,
    schemaTipoAcaoWorkflowSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.loaded
);

export const getErrors = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.errors
);

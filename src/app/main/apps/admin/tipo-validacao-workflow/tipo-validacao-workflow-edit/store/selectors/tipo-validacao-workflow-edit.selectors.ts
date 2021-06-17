import {createSelector} from '@ngrx/store';
import {
    getTipoValidacaoWorkflowEditAppState,
    TipoValidacaoWorkflowEditAppState,
    TipoValidacaoWorkflowEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '@cdk/normalizr';

const schemaTipoValidacaoWorkflowSelectors = createSchemaSelectors<TipoValidacaoWorkflow>(tipoValidacaoWorkflowSchema);

export const getTipoValidacaoWorkflowEditState = createSelector(
    getTipoValidacaoWorkflowEditAppState,
    (state: TipoValidacaoWorkflowEditAppState) => state.tipoValidacaoWorkflow
);

export const getTipoValidacaoWorkflowId = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.entityId
);

export const getTipoValidacaoWorkflow = createSelector(
    schemaTipoValidacaoWorkflowSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowId,
    schemaTipoValidacaoWorkflowSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.loaded
);

export const getErrors = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.errors
);

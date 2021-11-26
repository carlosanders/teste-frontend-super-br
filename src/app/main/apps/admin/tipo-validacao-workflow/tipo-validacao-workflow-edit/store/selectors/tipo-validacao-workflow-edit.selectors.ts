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

export const getTipoValidacaoWorkflowEditState: any = createSelector(
    getTipoValidacaoWorkflowEditAppState,
    (state: TipoValidacaoWorkflowEditAppState) => state.tipoValidacaoWorkflow
);

export const getTipoValidacaoWorkflowId: any = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.entityId
);

export const getTipoValidacaoWorkflow: any = createSelector(
    schemaTipoValidacaoWorkflowSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowId,
    schemaTipoValidacaoWorkflowSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTipoValidacaoWorkflowEditState,
    (state: TipoValidacaoWorkflowEditState) => state.errors
);

import {createSelector} from '@ngrx/store';
import {getTipoAcaoWorkflowEditAppState, TipoAcaoWorkflowEditAppState, TipoAcaoWorkflowEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';

const schemaTipoAcaoWorkflowSelectors = createSchemaSelectors<TipoAcaoWorkflow>(tipoAcaoWorkflowSchema);

export const getTipoAcaoWorkflowEditState: any = createSelector(
    getTipoAcaoWorkflowEditAppState,
    (state: TipoAcaoWorkflowEditAppState) => state.tipoAcaoWorkflow
);

export const getTipoAcaoWorkflowId: any = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.entityId
);

export const getTipoAcaoWorkflow: any = createSelector(
    schemaTipoAcaoWorkflowSelectors.getNormalizedEntities,
    getTipoAcaoWorkflowId,
    schemaTipoAcaoWorkflowSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTipoAcaoWorkflowEditState,
    (state: TipoAcaoWorkflowEditState) => state.errors
);

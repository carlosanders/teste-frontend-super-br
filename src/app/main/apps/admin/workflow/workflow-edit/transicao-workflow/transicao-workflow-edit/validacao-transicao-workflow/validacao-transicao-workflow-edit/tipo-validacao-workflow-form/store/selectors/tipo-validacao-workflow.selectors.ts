import {createSelector} from '@ngrx/store';
import {TipoValidacaoWorkflowAppState, TipoValidacaoWorkflowState, getValidacaoFormAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {tipoValidacaoWorkflow as schema} from '@cdk/normalizr';

const schemaTipoValidacaoWorkflowSelectors = createSchemaSelectors<TipoValidacaoWorkflow>(schema);

export const getTipoValidacaoWorkflowState = createSelector(
    getValidacaoFormAppState,
    (state: TipoValidacaoWorkflowAppState) => state.tipoValidacaoWorkflow
);

export const getTipoValidacaoWorkflowId = createSelector(
    getTipoValidacaoWorkflowState,
    (state: TipoValidacaoWorkflowState) => state.loaded ? state.entityId : null
);

export const getTipoValidacaoWorkflow = createSelector(
    schemaTipoValidacaoWorkflowSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowId,
    schemaTipoValidacaoWorkflowSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getTipoValidacaoWorkflowState,
    (state: TipoValidacaoWorkflowState) => state.loaded
);

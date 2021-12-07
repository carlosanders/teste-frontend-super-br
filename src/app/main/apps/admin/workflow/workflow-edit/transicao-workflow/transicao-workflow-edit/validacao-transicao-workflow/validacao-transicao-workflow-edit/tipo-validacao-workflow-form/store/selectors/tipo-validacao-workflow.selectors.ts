import {createSelector} from '@ngrx/store';
import {getValidacaoFormAppState, TipoValidacaoWorkflowAppState, TipoValidacaoWorkflowState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';
import {tipoValidacaoWorkflow as schema} from '@cdk/normalizr';

const schemaTipoValidacaoWorkflowSelectors = createSchemaSelectors<TipoValidacaoWorkflow>(schema);

export const getTipoValidacaoWorkflowState: any = createSelector(
    getValidacaoFormAppState,
    (state: TipoValidacaoWorkflowAppState) => state.tipoValidacaoWorkflow
);

export const getTipoValidacaoWorkflowId: any = createSelector(
    getTipoValidacaoWorkflowState,
    (state: TipoValidacaoWorkflowState) => state.loaded ? state.entityId : null
);

export const getTipoValidacaoWorkflow: any = createSelector(
    schemaTipoValidacaoWorkflowSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowId,
    schemaTipoValidacaoWorkflowSelectors.entityProjector
);

export const getHasLoaded: any = createSelector(
    getTipoValidacaoWorkflowState,
    (state: TipoValidacaoWorkflowState) => state.loaded
);

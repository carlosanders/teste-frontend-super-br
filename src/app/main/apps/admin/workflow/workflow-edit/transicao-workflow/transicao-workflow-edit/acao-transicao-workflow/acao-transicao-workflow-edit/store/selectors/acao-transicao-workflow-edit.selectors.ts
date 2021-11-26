import {createSelector} from '@ngrx/store';
import {AcaoTransicaoWorkflowEditAppState, AcaoTransicaoWorkflowEditState, getAcaoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';
import {acaoTransicaoWorkflow as acaoSchema} from '@cdk/normalizr';

const schemaAcaoSelectors = createSchemaSelectors<AcaoTransicaoWorkflow>(acaoSchema);

export const getAcaoEditState: any = createSelector(
    getAcaoEditAppState,
    (state: AcaoTransicaoWorkflowEditAppState) => state.acaoTransicaoWorkflow
);

export const getAcaoId: any = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.loaded ? state.loaded.value : null
);

export const getAcao: any = createSelector(
    schemaAcaoSelectors.getNormalizedEntities,
    getAcaoId,
    schemaAcaoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAcaoEditState,
    (state: AcaoTransicaoWorkflowEditState) => state.errors
);

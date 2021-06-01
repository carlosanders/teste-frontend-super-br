import {createSelector} from '@ngrx/store';
import {
    getAcaoEditAppState,
    AcaoTransicaoWorkflowEditAppState,
    TipoAcaoWorkflowState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoAcaoWorkflow>(tipoAcaoWorkflowSchema);

export const getTipoAcaoWorkflowListState = createSelector(
    getAcaoEditAppState,
    (state: AcaoTransicaoWorkflowEditAppState) => state.tipoAcaoWorkflowList
);

export const getTipoAcaoWorkflowListIds = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowState) => state.entitiesId
);

export const getTipoAcaoWorkflowList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoAcaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getTipoAcaoWorkflowListLoaded = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowState) => state.loaded
);

export const getIsLoading = createSelector(
  getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowState) => state.loading
);

import {createSelector} from '@ngrx/store';
import {
    getValidacaoEditAppState,
    ValidacaoTransicaoWorkflowEditAppState,
    TipoValidacaoWorkflowState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '@cdk/normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoValidacaoWorkflow>(tipoValidacaoWorkflowSchema);

export const getTipoValidacaoWorkflowListState = createSelector(
    getValidacaoEditAppState,
    (state: ValidacaoTransicaoWorkflowEditAppState) => state.tipoValidacaoWorkflowList
);

export const getTipoValidacaoWorkflowListIds = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowState) => state.entitiesId
);

export const getTipoValidacaoWorkflowList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getTipoValidacaoWorkflowListLoaded = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowState) => state.loaded
);

export const getIsLoading = createSelector(
  getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowState) => state.loading
);

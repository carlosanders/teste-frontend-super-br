import {createSelector} from '@ngrx/store';
import {
    getValidacaoEditAppState,
    TipoValidacaoWorkflowState,
    ValidacaoTransicaoWorkflowEditAppState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoValidacaoWorkflow as tipoValidacaoWorkflowSchema} from '@cdk/normalizr';
import {TipoValidacaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoValidacaoWorkflow>(tipoValidacaoWorkflowSchema);

export const getTipoValidacaoWorkflowListState: any = createSelector(
    getValidacaoEditAppState,
    (state: ValidacaoTransicaoWorkflowEditAppState) => state.tipoValidacaoWorkflowList
);

export const getTipoValidacaoWorkflowListIds: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowState) => state.entitiesId
);

export const getTipoValidacaoWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoValidacaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getTipoValidacaoWorkflowListLoaded: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTipoValidacaoWorkflowListState,
    (state: TipoValidacaoWorkflowState) => state.loading
);

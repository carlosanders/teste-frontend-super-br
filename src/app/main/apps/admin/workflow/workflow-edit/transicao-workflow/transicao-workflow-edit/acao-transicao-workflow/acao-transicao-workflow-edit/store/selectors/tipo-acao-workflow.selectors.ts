import {createSelector} from '@ngrx/store';
import {AcaoTransicaoWorkflowEditAppState, getAcaoEditAppState, TipoAcaoWorkflowState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tipoAcaoWorkflow as tipoAcaoWorkflowSchema} from '@cdk/normalizr';
import {TipoAcaoWorkflow} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<TipoAcaoWorkflow>(tipoAcaoWorkflowSchema);

export const getTipoAcaoWorkflowListState: any = createSelector(
    getAcaoEditAppState,
    (state: AcaoTransicaoWorkflowEditAppState) => state.tipoAcaoWorkflowList
);

export const getTipoAcaoWorkflowListIds: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowState) => state.entitiesId
);

export const getTipoAcaoWorkflowList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTipoAcaoWorkflowListIds,
    schemaSelectors.entitiesProjector
);

export const getTipoAcaoWorkflowListLoaded: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getTipoAcaoWorkflowListState,
    (state: TipoAcaoWorkflowState) => state.loading
);

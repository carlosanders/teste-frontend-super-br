import {createSelector} from '@ngrx/store';
import {
    getEspecieProcessoListAppState,
    WorkflowEspecieProcessoListAppState,
    WorkflowEspecieProcessoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import {EspecieProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieProcesso>(especieProcessoSchema);

export const getEspecieProcessoListState: any = createSelector(
    getEspecieProcessoListAppState,
    (state: WorkflowEspecieProcessoListAppState) => state.especieProcessoList
);

export const getEspecieProcessoListIds: any = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.entitiesId
);

export const getEspecieProcessoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieProcessoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.pagination
);

export const getEspecieProcessoListLoaded: any = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getEspecieProcessoListState,
    (state: WorkflowEspecieProcessoListState) => state.deletingErrors
);

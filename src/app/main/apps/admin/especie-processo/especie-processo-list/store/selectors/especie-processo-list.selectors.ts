import {createSelector} from '@ngrx/store';
import {EspecieProcessoListAppState, EspecieProcessoListState, getEspecieProcessoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import {EspecieProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<EspecieProcesso>(especieProcessoSchema);

export const getEspecieProcessoListState: any = createSelector(
    getEspecieProcessoListAppState,
    (state: EspecieProcessoListAppState) => state.especieProcessoList
);

export const getEspecieProcessoListIds: any = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.entitiesId
);

export const getEspecieProcessoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieProcessoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.pagination
);

export const getEspecieProcessoListLoaded: any = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.deletingErrors
);

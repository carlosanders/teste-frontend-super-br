import {createSelector} from '@ngrx/store';
import {
    getEspecieProcessoListAppState,
    EspecieProcessoListAppState,
    EspecieProcessoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import {EspecieProcesso} from '@cdk/models';
import {
    AfastamentosListState,
    getAfastamentosListState
} from "../../../../usuarios/afastamentos/afastamentos-list/store";

const schemaSelectors = createSchemaSelectors<EspecieProcesso>(especieProcessoSchema);

export const getEspecieProcessoListState = createSelector(
    getEspecieProcessoListAppState,
    (state: EspecieProcessoListAppState) => state.especieProcessoList
);

export const getEspecieProcessoListIds = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.entitiesId
);

export const getEspecieProcessoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getEspecieProcessoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.pagination
);

export const getEspecieProcessoListLoaded = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getEspecieProcessoListState,
    (state: EspecieProcessoListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.deletingErrors
);

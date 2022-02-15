import {createSelector} from '@ngrx/store';
import {AfastamentosListAppState, AfastamentosListState, getAfastamentosListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {Afastamento} from '@cdk/models/afastamento.model';

const schemaSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);

export const getAfastamentosListState: any = createSelector(
    getAfastamentosListAppState,
    (state: AfastamentosListAppState) => state.afastamentosList
);

export const getAfastamentosListIds: any = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.entitiesId
);

export const getAfastamentosList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAfastamentosListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.pagination
);

export const getAfastamentosListLoaded: any = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getAfastamentosListState,
    (state: AfastamentosListState) => state.deletingErrors
);

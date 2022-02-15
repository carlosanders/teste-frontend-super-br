import {createSelector} from '@ngrx/store';
import {AfastamentoListAppState, AfastamentoListState, getAfastamentoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {Afastamento} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Afastamento>(afastamentoSchema);

export const getAfastamentoListState: any = createSelector(
    getAfastamentoListAppState,
    (state: AfastamentoListAppState) => state.afastamentoList
);

export const getAfastamentoListIds: any = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.entitiesId
);

export const getAfastamentoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getAfastamentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.pagination
);

export const getAfastamentoListLoaded: any = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getAfastamentoListState,
    (state: AfastamentoListState) => state.deletingErrors
);

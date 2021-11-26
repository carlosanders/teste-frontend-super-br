import {createSelector} from '@ngrx/store';
import {getRemessaListAppState, RemessaListAppState, RemessaListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tramitacao as tramitacaoSchema} from '@cdk/normalizr';
import {Tramitacao} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Tramitacao>(tramitacaoSchema);

export const getRemessaListState: any = createSelector(
    getRemessaListAppState,
    (state: RemessaListAppState) => state.remessaList
);

export const getRemessaListIds: any = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.entitiesId
);

export const getRemessaList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getRemessaListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.pagination
);

export const getRemessaListLoaded: any = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRemessaListState,
    (state: RemessaListState) => state.deletingErrors
);

import {createSelector} from '@ngrx/store';
import {getRootLocalizadoresListAppState, RootLocalizadoresListAppState, RootLocalizadoresListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {Localizador} from '@cdk/models/localizador.model';

const schemaSelectors = createSchemaSelectors<Localizador>(localizadorSchema);

export const getRootLocalizadoresListState = createSelector(
    getRootLocalizadoresListAppState,
    (state: RootLocalizadoresListAppState) => state.localizadoresList
);

export const getLocalizadorListIds = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.entitiesId
);

export const getLocalizadorList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLocalizadorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.pagination
);

export const getLocalizadorListLoaded = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.loaded
);

export const getIsLoading = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.loading
);

export const getDeletingIds = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.deletedIds
);

export const getDeletingErrors = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.deletingErrors
);

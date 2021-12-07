import {createSelector} from '@ngrx/store';
import {getRootLocalizadoresListAppState, RootLocalizadoresListAppState, RootLocalizadoresListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {Localizador} from '@cdk/models/localizador.model';

const schemaSelectors = createSchemaSelectors<Localizador>(localizadorSchema);

export const getRootLocalizadoresListState: any = createSelector(
    getRootLocalizadoresListAppState,
    (state: RootLocalizadoresListAppState) => state.localizadoresList
);

export const getLocalizadorListIds: any = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.entitiesId
);

export const getLocalizadorList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLocalizadorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.pagination
);

export const getLocalizadorListLoaded: any = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getRootLocalizadoresListState,
    (state: RootLocalizadoresListState) => state.deletingErrors
);

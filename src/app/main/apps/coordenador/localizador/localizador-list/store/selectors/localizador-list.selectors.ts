import {createSelector} from '@ngrx/store';
import {
    getLocalizadorListAppState,
    LocalizadorListAppState,
    LocalizadorListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {Localizador} from '@cdk/models/localizador.model';

const schemaSelectors = createSchemaSelectors<Localizador>(localizadorSchema);

export const getLocalizadorListState = createSelector(
    getLocalizadorListAppState,
    (state: LocalizadorListAppState) => state.localizadorList
);

export const getLocalizadorListIds = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.entitiesId
);

export const getLocalizadorList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLocalizadorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.pagination
);

export const getLocalizadorListLoaded = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.loaded
);

export const getIsLoading = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.loading
);

export const getDeletingIds = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.deletedIds
);

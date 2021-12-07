import {createSelector} from '@ngrx/store';
import {getLocalizadorListAppState, LocalizadorListAppState, LocalizadorListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {Localizador} from '@cdk/models/localizador.model';

const schemaSelectors = createSchemaSelectors<Localizador>(localizadorSchema);

export const getLocalizadorListState: any = createSelector(
    getLocalizadorListAppState,
    (state: LocalizadorListAppState) => state.localizadorList
);

export const getLocalizadorListIds: any = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.entitiesId
);

export const getLocalizadorList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getLocalizadorListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.pagination
);

export const getLocalizadorListLoaded: any = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getLocalizadorListState,
    (state: LocalizadorListState) => state.deletingErrors
);

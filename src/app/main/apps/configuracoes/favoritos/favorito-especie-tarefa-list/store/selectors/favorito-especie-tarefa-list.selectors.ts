import {createSelector} from '@ngrx/store';
import {
    getFavoritoListAppState,
    FavoritoListAppState,
    FavoritoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';
import {Favorito} from '@cdk/models/favorito.model';

const schemaSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoListState = createSelector(
    getFavoritoListAppState,
    (state: FavoritoListAppState) => state.favoritoList
);

export const getFavoritoListIds = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.entitiesId
);

export const getFavoritoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFavoritoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.pagination
);

export const getFavoritoListLoaded = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.deletedIds
);

export const getIsSaving = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.saving
);

export const getErrors = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.errors
);

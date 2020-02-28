import {createSelector} from '@ngrx/store';
import {
    getFavoritoListSetorResponsavelAppState,
    FavoritoListSetorResponsavelAppState,
    FavoritoListSetorResponsavelState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';
import {Favorito} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoListSetorResponsavelState = createSelector(
    getFavoritoListSetorResponsavelAppState,
    (state: FavoritoListSetorResponsavelAppState) => state.FavoritoListSetorResponsavel
);

export const getFavoritoListSetorResponsavelIds = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.entitiesId
);

export const getFavoritoListSetorResponsavel = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFavoritoListSetorResponsavelIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.pagination
);

export const getFavoritoListSetorResponsavelLoaded = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.loaded
);

export const getIsLoading = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.loading
);

export const getDeletingIds = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.deletedIds
);

export const getIsSaving = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.saving
);

export const getErrors = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.errors
);

export const getHasLoaded = createSelector(
    getFavoritoListSetorResponsavelState,
    (state: FavoritoListSetorResponsavelState) => state.loaded
);

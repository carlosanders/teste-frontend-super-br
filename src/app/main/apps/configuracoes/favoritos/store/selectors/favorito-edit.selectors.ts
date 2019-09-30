import {createSelector} from '@ngrx/store';
import {getFavoritoEditAppState, FavoritoEditAppState, FavoritoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models/favorito.model';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';

const schemaFavoritoSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoEditState = createSelector(
    getFavoritoEditAppState,
    (state: FavoritoEditAppState) => state.favorito
);

export const getFavoritoId = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.loaded ? state.loaded.value : null
);

export const getFavorito = createSelector(
    schemaFavoritoSelectors.getNormalizedEntities,
    getFavoritoId,
    schemaFavoritoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.loaded
);

export const getErrors = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.errors
);
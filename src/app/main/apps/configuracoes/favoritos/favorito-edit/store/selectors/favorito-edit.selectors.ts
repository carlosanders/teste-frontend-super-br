import {createSelector} from '@ngrx/store';
import {FavoritoEditAppState, FavoritoEditState, getFavoritoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models';
import {favorito as favoritoSchema} from '@cdk/normalizr';

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

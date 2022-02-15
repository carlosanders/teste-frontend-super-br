import {createSelector} from '@ngrx/store';
import {FavoritoEditAppState, FavoritoEditState, getFavoritoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Favorito} from '@cdk/models';
import {favorito as favoritoSchema} from '@cdk/normalizr';

const schemaFavoritoSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoEditState: any = createSelector(
    getFavoritoEditAppState,
    (state: FavoritoEditAppState) => state.favorito
);

export const getFavoritoId: any = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.loaded ? state.loaded.value : null
);

export const getFavorito: any = createSelector(
    schemaFavoritoSelectors.getNormalizedEntities,
    getFavoritoId,
    schemaFavoritoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getFavoritoEditState,
    (state: FavoritoEditState) => state.errors
);

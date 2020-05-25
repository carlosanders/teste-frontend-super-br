import {createSelector} from '@ngrx/store';
import {getTarefasAppState, TarefasAppState, FavoritoListState} from '../reducers';
import {Favorito} from '@cdk/models';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';

const schemaFavoritoSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.favorito
);

export const getFavoritoIds = createSelector(
    getFavoritoState,
    (state: FavoritoListState) => state.entitiesId
);

export const getFavoritoList = createSelector(
    schemaFavoritoSelectors.getNormalizedEntities,
    getFavoritoIds,
    schemaFavoritoSelectors.entitiesProjector
);

export const getFavoritoLoaded = createSelector(
    getFavoritoState,
    (state: FavoritoListState) => state.loaded
);

export const getFavoritoIsLoading = createSelector(
    getFavoritoState,
    (state: FavoritoListState) => state.loading
);


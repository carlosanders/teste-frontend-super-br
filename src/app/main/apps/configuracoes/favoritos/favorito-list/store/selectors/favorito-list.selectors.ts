import {createSelector} from '@ngrx/store';
import {FavoritoListAppState, FavoritoListState, getFavoritoListAppState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {favorito as favoritoSchema} from '@cdk/normalizr';
import {Favorito} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoListState: any = createSelector(
    getFavoritoListAppState,
    (state: FavoritoListAppState) => state.favoritoList
);

export const getFavoritoListIds: any = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.entitiesId
);

export const getFavoritoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFavoritoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.pagination
);

export const getFavoritoListLoaded: any = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getFavoritoListState,
    (state: FavoritoListState) => state.deletingErrors
);

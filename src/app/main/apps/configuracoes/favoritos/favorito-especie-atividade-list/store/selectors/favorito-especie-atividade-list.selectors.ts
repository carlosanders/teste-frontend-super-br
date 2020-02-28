import {createSelector} from '@ngrx/store';
import {
    getFavoritoListEspecieAtividadeAppState,
    FavoritoListEspecieAtividadeAppState,
    FavoritoListEspecieAtividadeState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';
import {Favorito} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoListEspecieAtividadeState = createSelector(
    getFavoritoListEspecieAtividadeAppState,
    (state: FavoritoListEspecieAtividadeAppState) => state.FavoritoListEspecieAtividade
);

export const getFavoritoListEspecieAtividadeIds = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.entitiesId
);

export const getFavoritoListEspecieAtividade = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFavoritoListEspecieAtividadeIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.pagination
);

export const getFavoritoListEspecieAtividadeLoaded = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.loaded
);

export const getIsLoading = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.loading
);

export const getDeletingIds = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.deletedIds
);

export const getIsSaving = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.saving
);

export const getErrors = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.errors
);

export const getHasLoaded = createSelector(
    getFavoritoListEspecieAtividadeState,
    (state: FavoritoListEspecieAtividadeState) => state.loaded
);

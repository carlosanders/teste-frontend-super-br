import {createSelector} from '@ngrx/store';
import {
    getFavoritoListEspecieTarefaAppState,
    FavoritoListEspecieTarefaAppState,
    FavoritoListEspecieTarefaState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {favorito as favoritoSchema} from '@cdk/normalizr/favorito.schema';
import {Favorito} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Favorito>(favoritoSchema);

export const getFavoritoListEspecieTarefaState = createSelector(
    getFavoritoListEspecieTarefaAppState,
    (state: FavoritoListEspecieTarefaAppState) => state.FavoritoListEspecieTarefa
);

export const getFavoritoListEspecieTarefaIds = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.entitiesId
);

export const getFavoritoListEspecieTarefa = createSelector(
    schemaSelectors.getNormalizedEntities,
    getFavoritoListEspecieTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.pagination
);

export const getFavoritoListEspecieTarefaLoaded = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.loaded
);

export const getIsLoading = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.loading
);

export const getDeletingIds = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.deletedIds
);

export const getIsSaving = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.saving
);

export const getErrors = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.errors
);

export const getHasLoaded = createSelector(
    getFavoritoListEspecieTarefaState,
    (state: FavoritoListEspecieTarefaState) => state.loaded
);

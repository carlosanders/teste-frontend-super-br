import {createSelector} from '@ngrx/store';
import {
    getVinculacaoUsuarioListAppState,
    VinculacaoUsuarioListAppState,
    VinculacaoUsuarioListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from '@cdk/normalizr/vinculacao-usuario.schema';
import {VinculacaoUsuario} from '@cdk/models/vinculacao-usuario.model';

const schemaSelectors = createSchemaSelectors<VinculacaoUsuario>(vinculacaoUsuarioSchema);

export const getVinculacaoUsuarioListState = createSelector(
    getVinculacaoUsuarioListAppState,
    (state: VinculacaoUsuarioListAppState) => state.vinculacaoUsuarioList
);

export const getVinculacaoUsuarioListIds = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.entitiesId
);

export const getVinculacaoUsuarioList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoUsuarioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.pagination
);

export const getVinculacaoUsuarioListLoaded = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.loaded
);

export const getIsLoading = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.loading
);

export const getDeletingIds = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.deletedIds
);

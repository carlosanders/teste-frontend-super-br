import {createSelector} from '@ngrx/store';
import {
    getVinculacaoPessoaUsuarioListAppState,
    VinculacaoPessoaUsuarioListAppState,
    VinculacaoPessoaUsuarioListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaUsuario as vinculacaoPessoaSchema} from '@cdk/normalizr';
import {VinculacaoPessoaUsuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoPessoaUsuario>(vinculacaoPessoaSchema);

export const getVinculacaoPessoaUsuarioListState = createSelector(
    getVinculacaoPessoaUsuarioListAppState,
    (state: VinculacaoPessoaUsuarioListAppState) => state.vinculacaoPessoaUsuarioList
);

export const getVinculacaoPessoaUsuarioListIds = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.entitiesId
);

export const getVinculacaoPessoaUsuarioList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoPessoaUsuarioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.pagination
);

export const getVinculacaoPessoaUsuarioListLoaded = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.loaded
);

export const getIsLoading = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.loading
);

export const getDeletingIds = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.deletedIds
);
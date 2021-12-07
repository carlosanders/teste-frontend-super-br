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

export const getVinculacaoPessoaUsuarioListState: any = createSelector(
    getVinculacaoPessoaUsuarioListAppState,
    (state: VinculacaoPessoaUsuarioListAppState) => state.vinculacaoPessoaUsuarioList
);

export const getVinculacaoPessoaUsuarioListIds: any = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.entitiesId
);

export const getVinculacaoPessoaUsuarioList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoPessoaUsuarioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.pagination
);

export const getVinculacaoPessoaUsuarioListLoaded: any = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getVinculacaoPessoaUsuarioListState,
    (state: VinculacaoPessoaUsuarioListState) => state.deletingErrors
);

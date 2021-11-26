import {createSelector} from '@ngrx/store';
import {getVinculacaoUsuarioListAppState, VinculacaoUsuarioListAppState, VinculacaoUsuarioListState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from '@cdk/normalizr';
import {VinculacaoUsuario} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoUsuario>(vinculacaoUsuarioSchema);

export const getVinculacaoUsuarioListState: any = createSelector(
    getVinculacaoUsuarioListAppState,
    (state: VinculacaoUsuarioListAppState) => state.vinculacaoUsuarioList
);

export const getVinculacaoUsuarioListIds: any = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.entitiesId
);

export const getVinculacaoUsuarioList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoUsuarioListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.pagination
);

export const getVinculacaoUsuarioListLoaded: any = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getVinculacaoUsuarioListState,
    (state: VinculacaoUsuarioListState) => state.deletingErrors
);

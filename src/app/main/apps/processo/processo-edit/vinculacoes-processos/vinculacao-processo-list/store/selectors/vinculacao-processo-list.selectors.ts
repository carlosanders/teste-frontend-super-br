import {createSelector} from '@ngrx/store';
import {
    getVinculacaoProcessoListAppState,
    VinculacaoProcessoListAppState,
    VinculacaoProcessoListState
} from 'app/main/apps/processo/processo-edit/vinculacoes-processos/vinculacao-processo-list/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import {VinculacaoProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoProcesso>(vinculacaoProcessoSchema);

export const getVinculacaoProcessoListState = createSelector(
    getVinculacaoProcessoListAppState,
    (state: VinculacaoProcessoListAppState) => state.vinculacaoProcessoList
);

export const getVinculacaoProcessoListIds = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.entitiesId
);

export const getVinculacaoProcessoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoProcessoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.pagination
);

export const getVinculacaoProcessoListLoaded = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.deletedIds
);

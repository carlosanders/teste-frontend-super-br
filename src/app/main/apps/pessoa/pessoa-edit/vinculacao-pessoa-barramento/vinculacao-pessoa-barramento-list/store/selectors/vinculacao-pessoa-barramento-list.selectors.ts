import {createSelector} from '@ngrx/store';
import {
    getVinculacaoPessoaBarramentoListAppState,
    VinculacaoPessoaBarramentoListAppState,
    VinculacaoPessoaBarramentoListState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoPessoaBarramento as vinculacaoPessoaBarramentoSchema} from '@cdk/normalizr/index';
import {VinculacaoPessoaBarramento} from "@cdk/models/vinculacao-pessoa-barramento";

const schemaSelectors = createSchemaSelectors<VinculacaoPessoaBarramento>(vinculacaoPessoaBarramentoSchema);

export const getVinculacaoPessoaBarramentoListState = createSelector(
    getVinculacaoPessoaBarramentoListAppState,
    (state: VinculacaoPessoaBarramentoListAppState) => state.vinculacaoPessoaBarramentoList
);

export const getVinculacaoPessoaBarramentoListIds = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.entitiesId
);

export const getVinculacaoPessoaBarramentoList = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoPessoaBarramentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.pagination
);

export const getVinculacaoPessoaBarramentoListLoaded = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.loaded
);

export const getIsLoading = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.loading
);

export const getDeletingIds = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.deletingIds
);

export const getDeletedIds = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.deletedIds
);

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

export const getVinculacaoPessoaBarramentoListState: any = createSelector(
    getVinculacaoPessoaBarramentoListAppState,
    (state: VinculacaoPessoaBarramentoListAppState) => state.vinculacaoPessoaBarramentoList
);

export const getVinculacaoPessoaBarramentoListIds: any = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.entitiesId
);

export const getVinculacaoPessoaBarramentoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoPessoaBarramentoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.pagination
);

export const getVinculacaoPessoaBarramentoListLoaded: any = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVinculacaoPessoaBarramentoListState,
    (state: VinculacaoPessoaBarramentoListState) => state.deletedIds
);

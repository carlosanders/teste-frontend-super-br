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

export const getVinculacaoProcessoListState: any = createSelector(
    getVinculacaoProcessoListAppState,
    (state: VinculacaoProcessoListAppState) => state.vinculacaoProcessoList
);

export const getVinculacaoProcessoListIds: any = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.entitiesId
);

export const getVinculacaoProcessoList: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacaoProcessoListIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.pagination
);

export const getVinculacaoProcessoListLoaded: any = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.loading
);

export const getDeletingIds: any = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.deletingIds
);

export const getDeletedIds: any = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.deletedIds
);

export const getDeletingErrors: any = createSelector(
    getVinculacaoProcessoListState,
    (state: VinculacaoProcessoListState) => state.deletingErrors
);

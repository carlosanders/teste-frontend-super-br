import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, getDadosBasicosAppState, VinculacaoProcessoState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import {VinculacaoProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoProcesso>(vinculacaoProcessoSchema);

export const getVinculacaoProcessoState = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.vinculacoesProcessos
);

export const getVinculacoesProcessosIds = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.entitiesId
);

export const getVinculacoesProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacoesProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getVinculacoesProcessosPagination = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.pagination
);

export const getVinculacoesProcessosLoaded = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loaded
);

export const getVinculacoesProcessosIsLoading = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loading
);

export const getVinculacoesProcessosDeletingIds = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.deletingIds
);

export const getVinculacoesProcessosDeletedIds = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.deletedIds
);

export const getVinculacaoProcessoIsSaving = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.saving
);

export const getVinculacaoProcessoErrors = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.errors
);

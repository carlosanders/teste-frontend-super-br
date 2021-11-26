import {createSelector} from '@ngrx/store';
import {DadosBasicosAppState, getDadosBasicosAppState, VinculacaoProcessoState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import {VinculacaoProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoProcesso>(vinculacaoProcessoSchema);

export const getVinculacaoProcessoState: any = createSelector(
    getDadosBasicosAppState,
    (state: DadosBasicosAppState) => state.vinculacoesProcessos
);

export const getVinculacoesProcessosIds: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.entitiesId
);

export const getVinculacoesProcessos: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getVinculacoesProcessosIds,
    schemaSelectors.entitiesProjector
);

export const getVinculacoesProcessosPagination: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.pagination
);

export const getVinculacoesProcessosLoaded: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loaded
);

export const getVinculacoesProcessosIsLoading: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loading
);

export const getVinculacoesProcessosDeletingIds: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.deletingIds
);

export const getVinculacoesProcessosDeletedIds: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.deletedIds
);

export const getVinculacaoProcessoIsSaving: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.saving
);

export const getVinculacaoProcessoErrors: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.errors
);

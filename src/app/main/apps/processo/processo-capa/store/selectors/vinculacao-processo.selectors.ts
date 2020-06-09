import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, ProcessoCapaAppState, VinculacaoProcessoState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr/vinculacao-processo.schema';
import {VinculacaoProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoProcesso>(vinculacaoProcessoSchema);

export const getVinculacaoProcessoState = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.vinculacoesProcessos
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

export const getPaginationVinculacoesProcessos = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.pagination
);

export const getVinculacoesProcessosLoaded = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loaded
);

export const getIsVinculacoesProcessosLoading = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loading
);

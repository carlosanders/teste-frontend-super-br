import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, ProcessoCapaAppState, VinculacaoProcessoState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import {VinculacaoProcesso} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<VinculacaoProcesso>(vinculacaoProcessoSchema);

export const getVinculacaoProcessoState: any = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.vinculacoesProcessos
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

export const getPaginationVinculacoesProcessos: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.pagination
);

export const getVinculacoesProcessosLoaded: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loaded
);

export const getIsVinculacoesProcessosLoading: any = createSelector(
    getVinculacaoProcessoState,
    (state: VinculacaoProcessoState) => state.loading
);

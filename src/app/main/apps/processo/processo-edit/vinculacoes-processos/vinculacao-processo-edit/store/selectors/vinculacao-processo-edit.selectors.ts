import {createSelector} from '@ngrx/store';
import {getVinculacaoProcessoEditAppState, VinculacaoProcessoEditAppState, VinculacaoProcessoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr/vinculacao-processo.schema';

const schemaVinculacaoProcessoSelectors = createSchemaSelectors<VinculacaoProcesso>(vinculacaoProcessoSchema);

export const getVinculacaoProcessoEditState = createSelector(
    getVinculacaoProcessoEditAppState,
    (state: VinculacaoProcessoEditAppState) => state.vinculacaoProcesso
);

export const getVinculacaoProcessoId = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoProcesso = createSelector(
    schemaVinculacaoProcessoSelectors.getNormalizedEntities,
    getVinculacaoProcessoId,
    schemaVinculacaoProcessoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.loaded
);

export const getErrors = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.errors
);

import {createSelector} from '@ngrx/store';
import {
    getVinculacaoProcessoEditAppState,
    VinculacaoProcessoEditAppState,
    VinculacaoProcessoEditState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';

const schemaVinculacaoProcessoSelectors = createSchemaSelectors<VinculacaoProcesso>(vinculacaoProcessoSchema);

export const getVinculacaoProcessoEditState: any = createSelector(
    getVinculacaoProcessoEditAppState,
    (state: VinculacaoProcessoEditAppState) => state.vinculacaoProcesso
);

export const getVinculacaoProcessoId: any = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.loaded ? state.loaded.value : null
);

export const getVinculacaoProcesso: any = createSelector(
    schemaVinculacaoProcessoSelectors.getNormalizedEntities,
    getVinculacaoProcessoId,
    schemaVinculacaoProcessoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getVinculacaoProcessoEditState,
    (state: VinculacaoProcessoEditState) => state.errors
);

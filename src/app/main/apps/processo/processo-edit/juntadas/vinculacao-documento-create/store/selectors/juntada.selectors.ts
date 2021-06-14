import {createSelector} from '@ngrx/store';
import {
    getVinculacaoDocumentoCreateAppState,
    VinculacaoDocumentoCreateAppState,
    VinculacaoDocumentoCreateState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getVinculacaoDocumentoCreateState = createSelector(
    getVinculacaoDocumentoCreateAppState,
    (state: VinculacaoDocumentoCreateAppState) => state.juntada
);

export const getJuntadaId = createSelector(
    getVinculacaoDocumentoCreateState,
    (state: VinculacaoDocumentoCreateState) => state.loaded ? state.loaded.value : null
);

export const getJuntada = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getVinculacaoDocumentoCreateState,
    (state: VinculacaoDocumentoCreateState) => state.saving
);

export const getHasLoaded = createSelector(
    getVinculacaoDocumentoCreateState,
    (state: VinculacaoDocumentoCreateState) => state.loaded
);

export const getErrors = createSelector(
    getVinculacaoDocumentoCreateState,
    (state: VinculacaoDocumentoCreateState) => state.errors
);

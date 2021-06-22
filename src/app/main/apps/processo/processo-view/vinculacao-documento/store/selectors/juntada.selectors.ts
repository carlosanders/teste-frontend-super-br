import {createSelector} from '@ngrx/store';
import {
    getProcessoViewVinculacaoDocumentoAppState,
    ProcessoViewVinculacaoDocumentoAppState,
    ProcessoViewVinculacaoDocumentoState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getProcessoViewVinculacaoDocumentoState = createSelector(
    getProcessoViewVinculacaoDocumentoAppState,
    (state: ProcessoViewVinculacaoDocumentoAppState) => state.juntada
);

export const getJuntadaId = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loaded ? state.loaded.value : null
);

export const getJuntada = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.saving
);

export const getHasLoaded = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.loaded
);

export const getErrors = createSelector(
    getProcessoViewVinculacaoDocumentoState,
    (state: ProcessoViewVinculacaoDocumentoState) => state.errors
);

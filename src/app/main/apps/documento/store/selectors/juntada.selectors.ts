import {createSelector} from '@ngrx/store';
import {getDocumentoAppState, DocumentoAppState, JuntadaState} from 'app/main/apps/documento/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr/juntada.schema';

const schemaJuntadaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.juntada
);

export const getJuntadaId = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.juntadaId ? state.juntadaId : null
);

export const getJuntada = createSelector(
    schemaJuntadaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaJuntadaSelectors.entityProjector
);

export const getJuntadaLoaded = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loaded
);

export const getJuntadaIsSaving = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.saving
);

export const getJuntadaErrors = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.errors
);

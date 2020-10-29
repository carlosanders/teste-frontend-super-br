import {createSelector} from '@ngrx/store';
import {getEnviaEmailAppState, EnviaEmailAppState, EnviaEmailState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr';

const schemaJuntadaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getEnviaEmailState = createSelector(
    getEnviaEmailAppState,
    (state: EnviaEmailAppState) => state.enviaemail
);

export const getIsSaving = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.saving
);

export const getErrors = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.errors
);

export const getJuntadaLoaded = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.loaded
);

export const getJuntadaId = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.loaded ? state.loaded.value : null
);

export const getJuntada = createSelector(
    schemaJuntadaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaJuntadaSelectors.entityProjector
);

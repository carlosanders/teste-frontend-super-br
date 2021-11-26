import {createSelector} from '@ngrx/store';
import {EnviaEmailAppState, EnviaEmailState, getEnviaEmailAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr';

const schemaJuntadaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getEnviaEmailState: any = createSelector(
    getEnviaEmailAppState,
    (state: EnviaEmailAppState) => state.enviaemail
);

export const getIsSaving: any = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.saving
);

export const getErrors: any = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.errors
);

export const getJuntadaLoaded: any = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.loaded
);

export const getJuntadaId: any = createSelector(
    getEnviaEmailState,
    (state: EnviaEmailState) => state.loaded ? state.loaded.value : null
);

export const getJuntada: any = createSelector(
    schemaJuntadaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaJuntadaSelectors.entityProjector
);

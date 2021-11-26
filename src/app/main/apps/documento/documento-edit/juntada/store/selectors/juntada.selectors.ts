import {createSelector} from '@ngrx/store';
import {DocumentoEditJuntadaAppState, getDocumentoEditJuntadaAppState, JuntadaState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Juntada} from '@cdk/models';
import {juntada as juntadaSchema} from '@cdk/normalizr';

const schemaJuntadaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaState: any = createSelector(
    getDocumentoEditJuntadaAppState,
    (state: DocumentoEditJuntadaAppState) => state.juntada
);

export const getJuntadaId: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.juntadaId ? state.juntadaId : null
);

export const getJuntada: any = createSelector(
    schemaJuntadaSelectors.getNormalizedEntities,
    getJuntadaId,
    schemaJuntadaSelectors.entityProjector
);

export const getJuntadaLoaded: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loaded
);

export const getJuntadaIsSaving: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.saving
);

export const getJuntadaErrors: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.errors
);

import {createSelector} from '@ngrx/store';
import {getEtiquetaEditAppState, EtiquetaEditAppState, EtiquetaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Etiqueta} from '@cdk/models';
import {etiqueta as etiquetaSchema} from '@cdk/normalizr';

const schemaEtiquetaSelectors = createSchemaSelectors<Etiqueta>(etiquetaSchema);

export const getEtiquetaEditState = createSelector(
    getEtiquetaEditAppState,
    (state: EtiquetaEditAppState) => state.etiqueta
);

export const getEtiquetaId = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.loaded ? state.loaded.value : null
);

export const getEtiqueta = createSelector(
    schemaEtiquetaSelectors.getNormalizedEntities,
    getEtiquetaId,
    schemaEtiquetaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.loaded
);

export const getErrors = createSelector(
    getEtiquetaEditState,
    (state: EtiquetaEditState) => state.errors
);

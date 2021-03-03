import {createSelector} from '@ngrx/store';
import {getRegraEtiquetaEditAppState, RegraEtiquetaEditAppState, RegraEtiquetaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {RegraEtiqueta} from '@cdk/models';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';

const schemaRegraEtiquetaSelectors = createSchemaSelectors<RegraEtiqueta>(regraEtiquetaSchema);

export const getRegraEtiquetaEditState = createSelector(
    getRegraEtiquetaEditAppState,
    (state: RegraEtiquetaEditAppState) => state.regraEtiqueta
);

export const getRegraEtiquetaId = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.loaded ? state.loaded.value : null
);

export const getRegraEtiqueta = createSelector(
    schemaRegraEtiquetaSelectors.getNormalizedEntities,
    getRegraEtiquetaId,
    schemaRegraEtiquetaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.loaded
);

export const getErrors = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.errors
);

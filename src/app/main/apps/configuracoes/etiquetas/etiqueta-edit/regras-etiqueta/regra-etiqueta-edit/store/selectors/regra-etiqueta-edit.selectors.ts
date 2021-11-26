import {createSelector} from '@ngrx/store';
import {getRegraEtiquetaEditAppState, RegraEtiquetaEditAppState, RegraEtiquetaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {RegraEtiqueta} from '@cdk/models';
import {regraEtiqueta as regraEtiquetaSchema} from '@cdk/normalizr';

const schemaRegraEtiquetaSelectors = createSchemaSelectors<RegraEtiqueta>(regraEtiquetaSchema);

export const getRegraEtiquetaEditState: any = createSelector(
    getRegraEtiquetaEditAppState,
    (state: RegraEtiquetaEditAppState) => state.regraEtiqueta
);

export const getRegraEtiquetaId: any = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.loaded ? state.loaded.value : null
);

export const getRegraEtiqueta: any = createSelector(
    schemaRegraEtiquetaSelectors.getNormalizedEntities,
    getRegraEtiquetaId,
    schemaRegraEtiquetaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getRegraEtiquetaEditState,
    (state: RegraEtiquetaEditState) => state.errors
);

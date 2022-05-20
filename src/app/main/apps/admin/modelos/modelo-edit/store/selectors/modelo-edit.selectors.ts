import {createSelector} from '@ngrx/store';
import {getAdminModeloEditAppState, AdminModeloEditAppState, AdminModeloEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(modeloSchema);

export const getAdminModeloEditState: any = createSelector(
    getAdminModeloEditAppState,
    (state: AdminModeloEditAppState) => state.modelo
);

export const getModeloId: any = createSelector(
    getAdminModeloEditState,
    (state: AdminModeloEditState) => state.loaded ? state.loaded.value : null
);

export const getModelo: any = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModeloId,
    schemaModeloSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getAdminModeloEditState,
    (state: AdminModeloEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getAdminModeloEditState,
    (state: AdminModeloEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getAdminModeloEditState,
    (state: AdminModeloEditState) => state.errors
);

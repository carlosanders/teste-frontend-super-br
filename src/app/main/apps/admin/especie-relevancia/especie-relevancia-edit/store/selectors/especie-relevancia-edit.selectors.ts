import {createSelector} from '@ngrx/store';
import {getEspecieRelevanciaEditAppState, EspecieRelevanciaEditAppState, EspecieRelevanciaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieRelevancia} from '@cdk/models';
import {especieRelevancia as especieRelevanciaSchema} from '@cdk/normalizr';

const schemaEspecieRelevanciaSelectors = createSchemaSelectors<EspecieRelevancia>(especieRelevanciaSchema);

export const getEspecieRelevanciaEditState = createSelector(
    getEspecieRelevanciaEditAppState,
    (state: EspecieRelevanciaEditAppState) => state.especieRelevancia
);

export const getEspecieRelevanciaId = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.entityId
);

export const getEspecieRelevancia = createSelector(
    schemaEspecieRelevanciaSelectors.getNormalizedEntities,
    getEspecieRelevanciaId,
    schemaEspecieRelevanciaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.loaded
);

export const getErrors = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.errors
);

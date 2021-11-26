import {createSelector} from '@ngrx/store';
import {EspecieRelevanciaEditAppState, EspecieRelevanciaEditState, getEspecieRelevanciaEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieRelevancia} from '@cdk/models';
import {especieRelevancia as especieRelevanciaSchema} from '@cdk/normalizr';

const schemaEspecieRelevanciaSelectors = createSchemaSelectors<EspecieRelevancia>(especieRelevanciaSchema);

export const getEspecieRelevanciaEditState: any = createSelector(
    getEspecieRelevanciaEditAppState,
    (state: EspecieRelevanciaEditAppState) => state.especieRelevancia
);

export const getEspecieRelevanciaId: any = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.entityId
);

export const getEspecieRelevancia: any = createSelector(
    schemaEspecieRelevanciaSelectors.getNormalizedEntities,
    getEspecieRelevanciaId,
    schemaEspecieRelevanciaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getEspecieRelevanciaEditState,
    (state: EspecieRelevanciaEditState) => state.errors
);

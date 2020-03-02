import {createSelector} from '@ngrx/store';
import {getGarantiaEditAppState, GarantiaEditAppState, GarantiaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Garantia} from '@cdk/models';
import {garantia as garantiaSchema} from '@cdk/normalizr/garantia.schema';

const schemaGarantiaSelectors = createSchemaSelectors<Garantia>(garantiaSchema);

export const getGarantiaEditState = createSelector(
    getGarantiaEditAppState,
    (state: GarantiaEditAppState) => state.garantia
);

export const getGarantiaId = createSelector(
    getGarantiaEditState,
    (state: GarantiaEditState) => state.loaded ? state.loaded.value : null
);

export const getGarantia = createSelector(
    schemaGarantiaSelectors.getNormalizedEntities,
    getGarantiaId,
    schemaGarantiaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getGarantiaEditState,
    (state: GarantiaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getGarantiaEditState,
    (state: GarantiaEditState) => state.loaded
);

export const getErrors = createSelector(
    getGarantiaEditState,
    (state: GarantiaEditState) => state.errors
);

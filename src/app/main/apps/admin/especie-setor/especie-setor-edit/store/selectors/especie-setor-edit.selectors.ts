import {createSelector} from '@ngrx/store';
import {getEspecieSetorEditAppState, EspecieSetorEditAppState, EspecieSetorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieSetor} from '@cdk/models';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';

const schemaEspecieSetorSelectors = createSchemaSelectors<EspecieSetor>(especieSetorSchema);

export const getEspecieSetorEditState = createSelector(
    getEspecieSetorEditAppState,
    (state: EspecieSetorEditAppState) => state.especieSetor
);

export const getEspecieSetorId = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.entityId
);

export const getEspecieSetor = createSelector(
    schemaEspecieSetorSelectors.getNormalizedEntities,
    getEspecieSetorId,
    schemaEspecieSetorSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.loaded
);

export const getErrors = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.errors
);

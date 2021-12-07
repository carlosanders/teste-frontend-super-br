import {createSelector} from '@ngrx/store';
import {EspecieSetorEditAppState, EspecieSetorEditState, getEspecieSetorEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieSetor} from '@cdk/models';
import {especieSetor as especieSetorSchema} from '@cdk/normalizr';

const schemaEspecieSetorSelectors = createSchemaSelectors<EspecieSetor>(especieSetorSchema);

export const getEspecieSetorEditState: any = createSelector(
    getEspecieSetorEditAppState,
    (state: EspecieSetorEditAppState) => state.especieSetor
);

export const getEspecieSetorId: any = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.entityId
);

export const getEspecieSetor: any = createSelector(
    schemaEspecieSetorSelectors.getNormalizedEntities,
    getEspecieSetorId,
    schemaEspecieSetorSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getEspecieSetorEditState,
    (state: EspecieSetorEditState) => state.errors
);

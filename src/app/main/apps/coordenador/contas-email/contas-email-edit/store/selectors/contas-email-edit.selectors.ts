import {createSelector} from '@ngrx/store';
import {ContaEmailEditAppState, ContaEmailEditState, getContaEmailEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ContaEmail} from '@cdk/models';
import {contaEmail as contaEmailSchema} from '@cdk/normalizr';

const schemaContaEmailSelectors = createSchemaSelectors<ContaEmail>(contaEmailSchema);

export const getContaEmailEditState = createSelector(
    getContaEmailEditAppState,
    (state: ContaEmailEditAppState) => state.contaEmail
);

export const getContaEmailId = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.entityId
);

export const getContaEmail = createSelector(
    schemaContaEmailSelectors.getNormalizedEntities,
    getContaEmailId,
    schemaContaEmailSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.loaded
);

export const getErrors = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.errors
);

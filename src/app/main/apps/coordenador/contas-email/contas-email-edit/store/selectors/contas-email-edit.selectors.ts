import {createSelector} from '@ngrx/store';
import {ContaEmailEditAppState, ContaEmailEditState, getContaEmailEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ContaEmail} from '@cdk/models';
import {contaEmail as contaEmailSchema} from '@cdk/normalizr';

const schemaContaEmailSelectors = createSchemaSelectors<ContaEmail>(contaEmailSchema);

export const getContaEmailEditState: any = createSelector(
    getContaEmailEditAppState,
    (state: ContaEmailEditAppState) => state.contaEmail
);

export const getContaEmailId: any = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.entityId
);

export const getContaEmail: any = createSelector(
    schemaContaEmailSelectors.getNormalizedEntities,
    getContaEmailId,
    schemaContaEmailSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getContaEmailEditState,
    (state: ContaEmailEditState) => state.errors
);

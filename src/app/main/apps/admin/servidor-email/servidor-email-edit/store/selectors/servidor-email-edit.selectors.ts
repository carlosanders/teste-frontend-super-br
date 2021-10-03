import {createSelector} from '@ngrx/store';
import {ServidorEmailEditAppState, ServidorEmailEditState, getServidorEmailEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ServidorEmail} from '@cdk/models';
import {servidorEmail as servidorEmailSchema} from '@cdk/normalizr';

const schemaServidorEmailSelectors = createSchemaSelectors<ServidorEmail>(servidorEmailSchema);

export const getServidorEmailEditState = createSelector(
    getServidorEmailEditAppState,
    (state: ServidorEmailEditAppState) => state.servidorEmail
);

export const getServidorEmailId = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.entityId
);

export const getServidorEmail = createSelector(
    schemaServidorEmailSelectors.getNormalizedEntities,
    getServidorEmailId,
    schemaServidorEmailSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.loaded
);

export const getErrors = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.errors
);

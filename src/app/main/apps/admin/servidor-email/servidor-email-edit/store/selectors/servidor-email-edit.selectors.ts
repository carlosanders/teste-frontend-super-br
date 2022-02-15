import {createSelector} from '@ngrx/store';
import {ServidorEmailEditAppState, ServidorEmailEditState, getServidorEmailEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ServidorEmail} from '@cdk/models';
import {servidorEmail as servidorEmailSchema} from '@cdk/normalizr';

const schemaServidorEmailSelectors = createSchemaSelectors<ServidorEmail>(servidorEmailSchema);

export const getServidorEmailEditState: any = createSelector(
    getServidorEmailEditAppState,
    (state: ServidorEmailEditAppState) => state.servidorEmail
);

export const getServidorEmailId: any = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.entityId
);

export const getServidorEmail: any = createSelector(
    schemaServidorEmailSelectors.getNormalizedEntities,
    getServidorEmailId,
    schemaServidorEmailSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getServidorEmailEditState,
    (state: ServidorEmailEditState) => state.errors
);

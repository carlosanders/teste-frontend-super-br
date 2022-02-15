import {createSelector} from '@ngrx/store';
import {getSigiloEditAppState, SigiloEditAppState, SigiloEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Sigilo} from '@cdk/models';
import {sigilo as sigiloSchema} from '@cdk/normalizr';

const schemaSigiloSelectors = createSchemaSelectors<Sigilo>(sigiloSchema);

export const getSigiloEditState: any = createSelector(
    getSigiloEditAppState,
    (state: SigiloEditAppState) => state.sigilo
);

export const getSigiloId: any = createSelector(
    getSigiloEditState,
    (state: SigiloEditState) => state.loaded ? state.loaded.value : null
);

export const getSigilo: any = createSelector(
    schemaSigiloSelectors.getNormalizedEntities,
    getSigiloId,
    schemaSigiloSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getSigiloEditState,
    (state: SigiloEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getSigiloEditState,
    (state: SigiloEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getSigiloEditState,
    (state: SigiloEditState) => state.errors
);

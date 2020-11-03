import {createSelector} from '@ngrx/store';
import {getRegraEditAppState, RegraEditAppState, RegraEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Regra} from '@cdk/models';
import {regra as regraSchema} from '@cdk/normalizr';

const schemaRegraSelectors = createSchemaSelectors<Regra>(regraSchema);

export const getRegraEditState = createSelector(
    getRegraEditAppState,
    (state: RegraEditAppState) => state.regra
);

export const getRegraId = createSelector(
    getRegraEditState,
    (state: RegraEditState) => state.loaded ? state.loaded.value : null
);

export const getRegra = createSelector(
    schemaRegraSelectors.getNormalizedEntities,
    getRegraId,
    schemaRegraSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getRegraEditState,
    (state: RegraEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getRegraEditState,
    (state: RegraEditState) => state.loaded
);

export const getErrors = createSelector(
    getRegraEditState,
    (state: RegraEditState) => state.errors
);

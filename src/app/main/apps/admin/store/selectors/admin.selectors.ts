import {createSelector} from '@ngrx/store';
import {getAdminAppState, AdminAppState, AdminState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getAdminState = createSelector(
    getAdminAppState,
    (state: AdminAppState) => state.admin
);

export const getUnidadeId = createSelector(
    getAdminState,
    (state: AdminState) => state.loaded ? state.loaded.value : null
);

export const getUnidade = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getUnidadeId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoaded = createSelector(
    getAdminState,
    (state: AdminState) => state.loaded
);

export const getErrors = createSelector(
    getAdminState,
    (state: AdminState) => state.errors
);

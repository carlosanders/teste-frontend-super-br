import {createSelector} from '@ngrx/store';
import {getRootLocalizadoresAppState, RootLocalizadoresAppState, RootLocalizadoresState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Setor} from '@cdk/models';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';

const schemaSetorSelectors = createSchemaSelectors<Setor>(setorSchema);

export const getRootLocalizadoresState = createSelector(
    getRootLocalizadoresAppState,
    (state: RootLocalizadoresAppState) => state.localizador
);

export const getSetorId = createSelector(
    getRootLocalizadoresState,
    (state: RootLocalizadoresState) => (state.loaded && state.loaded.id === 'setorHandle') ? state.loaded.value : null
);

export const getSetor = createSelector(
    schemaSetorSelectors.getNormalizedEntities,
    getSetorId,
    schemaSetorSelectors.entityProjector
);

export const getHasLoadedSetor = createSelector(
    getRootLocalizadoresState,
    (state: RootLocalizadoresState) => state.loaded.id === 'setorHandle' ? state.loaded : false
);

export const getErrors = createSelector(
    getRootLocalizadoresState,
    (state: RootLocalizadoresState) => state.errors
);

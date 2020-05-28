import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, ProcessoCapaAppState, JuntadaState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr/juntada.schema';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaState = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.juntadas
);

export const getJuntadasIds = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.entitiesId
);

export const getJuntadas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadasIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.pagination
);

export const getJuntadasLoaded = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loaded
);

export const getIsJuntadasLoading = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loading
);

export const getBinary = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.binary
);

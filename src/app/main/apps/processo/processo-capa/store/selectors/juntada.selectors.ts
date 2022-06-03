import {createSelector} from '@ngrx/store';
import {getProcessoCapaAppState, ProcessoCapaAppState, JuntadaState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaState: any = createSelector(
    getProcessoCapaAppState,
    (state: ProcessoCapaAppState) => state.juntadas
);

export const getJuntadasIds: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.entitiesId
);

export const getJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getJuntadasIds,
    schemaSelectors.entitiesProjector
);

export const getPaginationJuntadas: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.pagination
);

export const getJuntadasLoaded: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loaded
);

export const getIsJuntadasLoading: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loading
);

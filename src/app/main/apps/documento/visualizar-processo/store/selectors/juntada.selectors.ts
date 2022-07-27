import {createSelector} from '@ngrx/store';
import {getVisualizarProcessoAppState, VisualizarProcessoAppState, JuntadaState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {juntada as juntadaSchema} from '@cdk/normalizr';
import {Juntada} from '@cdk/models';

const schemaSelectors = createSchemaSelectors<Juntada>(juntadaSchema);

export const getJuntadaState: any = createSelector(
    getVisualizarProcessoAppState,
    (state: VisualizarProcessoAppState) => state.juntadas
);

export const getCapaJuntadasIds: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.entitiesId
);

export const getCapaJuntadas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getCapaJuntadasIds,
    schemaSelectors.entitiesProjector
);

export const getCapaPaginationJuntadas: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.pagination
);

export const getCapaJuntadasLoaded: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loaded
);

export const getCapaIsJuntadasLoading: any = createSelector(
    getJuntadaState,
    (state: JuntadaState) => state.loading
);

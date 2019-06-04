import {createSelector} from '@ngrx/store';
import {
    getModelosAppState,
    ModelosAppState,
    ModelosState
} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as schemaModelo} from '@cdk/normalizr/modelo.schema';
import {processo as schemaProcesso} from '@cdk/normalizr/processo.schema';
import {tarefa as schemaTarefa} from '@cdk/normalizr/tarefa.schema';
import {Modelo} from '@cdk/models/modelo.model';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);
const schemaProcessoSelectors = createSchemaSelectors<Modelo>(schemaProcesso);
const schemaTarefaSelectors = createSchemaSelectors<Modelo>(schemaTarefa);

export const getModelosState = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state.modelos
);

export const getModelosIds = createSelector(
    getModelosState,
    (state: ModelosState) => state.entitiesId
);

export const getModelos = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModelosIds,
    schemaModeloSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getModelosState,
    (state: ModelosState) => state.pagination
);

export const getModelosLoaded = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded
);

export const getIsLoading = createSelector(
    getModelosState,
    (state: ModelosState) => state.loading
);

export const getProcessoId = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded && (state.loaded.id === 'processoHandle') ? state.loaded.value : null
);

export const getTarefaId = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded && (state.loaded.id === 'tarefaHandle') ? state.loaded.value : null
);

export const getProcesso = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getTarefa = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);

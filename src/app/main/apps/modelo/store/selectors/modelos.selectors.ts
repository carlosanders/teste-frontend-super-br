import {createSelector} from '@ngrx/store';
import {getModelosAppState, ModelosAppState, ModelosState} from '../reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {modelo as schemaModelo, processo as schemaProcesso, tarefa as schemaTarefa} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';

const schemaModeloSelectors = createSchemaSelectors<Modelo>(schemaModelo);
const schemaProcessoSelectors = createSchemaSelectors<Modelo>(schemaProcesso);
const schemaTarefaSelectors = createSchemaSelectors<Modelo>(schemaTarefa);

export const getModelosState: any = createSelector(
    getModelosAppState,
    (state: ModelosAppState) => state.modelos
);

export const getModelosIds: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.entitiesId
);

export const getModelos: any = createSelector(
    schemaModeloSelectors.getNormalizedEntities,
    getModelosIds,
    schemaModeloSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.pagination
);

export const getModelosLoaded: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loading
);

export const getProcessoId: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded && (state.loaded.id === 'processoHandle') ? state.loaded.value : null
);

export const getTarefaId: any = createSelector(
    getModelosState,
    (state: ModelosState) => state.loaded && (state.loaded.id === 'tarefaHandle') ? state.loaded.value : null
);

export const getProcesso: any = createSelector(
    schemaProcessoSelectors.getNormalizedEntities,
    getProcessoId,
    schemaProcessoSelectors.entityProjector
);

export const getTarefa: any = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);

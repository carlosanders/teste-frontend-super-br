import { createSelector } from '@ngrx/store';
import { getTarefasAppState, TarefasAppState, TarefasState } from 'app/main/apps/tarefas/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { tarefa as tarefaSchema } from '@cdk/normalizr/tarefa.schema';
import {Tarefa} from '@cdk/models';

import {Assunto} from '@cdk/models';
import { assunto as assuntoSchema } from '@cdk/normalizr/assunto.schema';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);
const schemaAssuntoSelectors = createSchemaSelectors<Assunto>(assuntoSchema);

export const getTarefasState = createSelector(
    getTarefasAppState,
    (state: TarefasAppState) => state.tarefas
);

export const getSelectedTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.selectedTarefaIds
);

export const getMaximizado = createSelector(
    getTarefasState,
    (state: TarefasState) => state.maximizado
);

export const getTarefasIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.entitiesId
);

export const getTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedTarefaIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getTarefasState,
    (state: TarefasState) => state.pagination
);

export const getTarefasLoaded = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loaded
);

export const getIsLoading = createSelector(
    getTarefasState,
    (state: TarefasState) => state.loading
);

export const getDeletingTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletingTarefaIds
);

export const getDeletedTarefaIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.deletedTarefaIds
);

/*
 * ISSUE-107 
 */
export const getIsAssuntoLoading = createSelector(
    getTarefasState,
    (state: TarefasState) => state.assuntoLoading
);

export const getIsAssuntoPanelIsOpen = createSelector(
    getTarefasState,
    (state: TarefasState) => state.assuntoPanelOpen
);

export const getAssuntosTarefasIds = createSelector(
    getTarefasState,
    (state: TarefasState) => state.assuntosId
);

export const getAssuntosTarefas = createSelector(
    schemaAssuntoSelectors.getNormalizedEntities,
    getAssuntosTarefasIds,
    schemaAssuntoSelectors.entitiesProjector
);

export const getIdTarefaToLoadAssuntos = createSelector(
    getTarefasState,
    (state: TarefasState) => state.idTarefaToLoadAssuntos
);



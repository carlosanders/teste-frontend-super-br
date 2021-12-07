import {createSelector} from '@ngrx/store';
import {getTarefaEditAppState, TarefaEditAppState, TarefaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Tarefa} from '@cdk/models';
import {tarefa as tarefaSchema} from '@cdk/normalizr';

const schemaTarefaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getTarefaEditState: any = createSelector(
    getTarefaEditAppState,
    (state: TarefaEditAppState) => state.tarefa
);

export const getTarefaId: any = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.loaded ? state.loaded.value : null
);

export const getTarefa: any = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getTarefaEditState,
    (state: TarefaEditState) => state.errors
);

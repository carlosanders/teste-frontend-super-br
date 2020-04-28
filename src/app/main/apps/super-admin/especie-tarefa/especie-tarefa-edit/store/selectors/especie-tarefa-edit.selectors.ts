import {createSelector} from '@ngrx/store';
import {getEspecieTarefaEditAppState, EspecieTarefaEditAppState, EspecieTarefaEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieTarefa} from '@cdk/models';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr/especie-tarefa.schema';

const schemaEspecieTarefaSelectors = createSchemaSelectors<EspecieTarefa>(especieTarefaSchema);

export const getEspecieTarefaEditState = createSelector(
    getEspecieTarefaEditAppState,
    (state: EspecieTarefaEditAppState) => state.especieTarefa
);

export const getEspecieTarefaId = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.entityId
);

export const getEspecieTarefa = createSelector(
    schemaEspecieTarefaSelectors.getNormalizedEntities,
    getEspecieTarefaId,
    schemaEspecieTarefaSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.loaded
);

export const getErrors = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.errors
);

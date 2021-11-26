import {createSelector} from '@ngrx/store';
import {EspecieTarefaEditAppState, EspecieTarefaEditState, getEspecieTarefaEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {EspecieTarefa} from '@cdk/models';
import {especieTarefa as especieTarefaSchema} from '@cdk/normalizr';

const schemaEspecieTarefaSelectors = createSchemaSelectors<EspecieTarefa>(especieTarefaSchema);

export const getEspecieTarefaEditState: any = createSelector(
    getEspecieTarefaEditAppState,
    (state: EspecieTarefaEditAppState) => state.especieTarefa
);

export const getEspecieTarefaId: any = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.entityId
);

export const getEspecieTarefa: any = createSelector(
    schemaEspecieTarefaSelectors.getNormalizedEntities,
    getEspecieTarefaId,
    schemaEspecieTarefaSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getEspecieTarefaEditState,
    (state: EspecieTarefaEditState) => state.errors
);

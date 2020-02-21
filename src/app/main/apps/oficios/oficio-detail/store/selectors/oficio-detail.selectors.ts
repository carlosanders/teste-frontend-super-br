import {createSelector} from '@ngrx/store';
import {getTarefaDetailAppState, TarefaDetailAppState, TarefaDetailState} from 'app/main/apps/tarefas/tarefa-detail/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr/tarefa.schema';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {Tarefa} from '@cdk/models/tarefa.model';
import {Documento} from '@cdk/models/documento.model';

const schemaTarefaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getTarefaState = createSelector(
    getTarefaDetailAppState,
    (state: TarefaDetailAppState) => state.tarefaDetail
);

export const getIsLoading = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loading
);

export const getIsSaving = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.saving
);

export const getHasLoaded = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loaded
);

export const getTarefaId = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.loaded ? state.loaded.value : null
);

export const getTarefa = createSelector(
    schemaTarefaSelectors.getNormalizedEntities,
    getTarefaId,
    schemaTarefaSelectors.entityProjector
);

export const getErrors = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.errors
);

export const getDocumentosId = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getTarefaState,
    (state: TarefaDetailState) => state.documentosLoaded
);

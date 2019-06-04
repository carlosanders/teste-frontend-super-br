import {createSelector} from '@ngrx/store';
import {getDocumentoAvulsoCreateAppState, DocumentoAvulsoCreateAppState, DocumentoAvulsoCreateState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models/modelo.model';
import {processo as schemaProcesso} from '@cdk/normalizr/processo.schema';
import {tarefa as schemaTarefa} from '@cdk/normalizr/tarefa.schema';

const schemaProcessoSelectors = createSchemaSelectors<Modelo>(schemaProcesso);
const schemaTarefaSelectors = createSchemaSelectors<Modelo>(schemaTarefa);

export const getDocumentoAvulsoCreateState = createSelector(
    getDocumentoAvulsoCreateAppState,
    (state: DocumentoAvulsoCreateAppState) => state.documentoAvulso
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.saving
);

export const getErrors = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.errors
);

export const getLoaded = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.loaded
);

export const getProcessoId = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.loaded && (state.loaded.id === 'processoHandle') ? state.loaded.value : null
);

export const getTarefaId = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.loaded && (state.loaded.id === 'tarefaHandle') ? state.loaded.value : null
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

import {createSelector} from '@ngrx/store';
import {DocumentoAvulsoCreateAppState, DocumentoAvulsoCreateState, getDocumentoAvulsoCreateAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Modelo} from '@cdk/models';
import {processo as schemaProcesso, tarefa as schemaTarefa} from '@cdk/normalizr';

const schemaProcessoSelectors = createSchemaSelectors<Modelo>(schemaProcesso);
const schemaTarefaSelectors = createSchemaSelectors<Modelo>(schemaTarefa);

export const getDocumentoAvulsoCreateState: any = createSelector(
    getDocumentoAvulsoCreateAppState,
    (state: DocumentoAvulsoCreateAppState) => state.documentoAvulso
);

export const getIsSaving: any = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.saving
);

export const getErrors: any = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.errors
);

export const getLoaded: any = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.loaded
);

export const getProcessoId: any = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.loaded && (state.loaded.id === 'processoHandle') ? state.loaded.value : null
);

export const getTarefaId: any = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.loaded && (state.loaded.id === 'tarefaHandle') ? state.loaded.value : null
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

import { createSelector } from '@ngrx/store';
import { getDocumentoAvulsoAppState, DocumentoAvulsoAppState, DocumentoAvulsoState } from 'app/main/apps/oficios/store/reducers';

import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { documentoAvulso as documentoAvulsoSchema } from '@cdk/normalizr/documento-avulso.schema';
import {DocumentoAvulso} from '../../../../../../@cdk/models/documento-avulso.model';

const schemaSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getDocumentoAvulso = createSelector(
    getDocumentoAvulsoAppState,
    (state: DocumentoAvulsoAppState) => state.processos
);

export const getSelectedDocumentoAvulsoIds = createSelector(
    getDocumentoAvulso,
    (state: DocumentoAvulsoState) => state.selectedProcessoIds
);

export const getMaximizado = createSelector(
    getDocumentoAvulso,
    (state: DocumentoAvulsoState) => state.maximizado
);

export const getDocumentosAvulsoIds = createSelector(
    getDocumentoAvulso,
    (state: DocumentoAvulsoState) => state.entitiesId
);

export const getProcessos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentosAvulsoIds,
    schemaSelectors.entitiesProjector
);

// export const getSelectedTarefas = createSelector(
//     schemaSelectors.getNormalizedEntities,
//     getSelectedTarefaIds,
//     schemaSelectors.entitiesProjector
// );
//
// export const getPagination = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.pagination
// );
//
export const getProcessosLoaded = createSelector(
    getDocumentoAvulso,
    (state: DocumentoAvulsoState) => state.loaded
);
//
// export const getIsLoading = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.loading
// );
//
// export const getDeletingTarefaIds = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.deletingTarefaIds
// );
//
// export const getDeletedTarefaIds = createSelector(
//     getTarefasState,
//     (state: TarefasState) => state.deletedTarefaIds
// );

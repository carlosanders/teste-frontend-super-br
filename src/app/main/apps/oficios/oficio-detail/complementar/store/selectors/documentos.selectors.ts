import { createSelector } from '@ngrx/store';
import { DocumentosState, getComplementarAppState, ComplementarAppState } from '../reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { Documento } from '@cdk/models';
import { documento as documentoSchema } from '@cdk/normalizr/documento.schema';
import {getAtividadeCreateDocumentosState} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store/selectors';
import {AtividadeCreateDocumentosState} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store/reducers';


const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosState = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state ? state.documentos : null
);

export const getDocumentosId = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.documentosId
);


export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.documentosLoaded
);

export const getSelectedDocumentoIds = createSelector(
    getDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.selectedDocumentosId
);

export const getSelectedDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getSelectedDocumentoIds,
    schemaDocumentoSelectors.entitiesProjector
);

export const getConvertendoDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state.convertendoDocumentoIds
);


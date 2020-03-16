import {createSelector} from '@ngrx/store';
import {DocumentosState, getResponderComplementarAppState, ResponderComplementarAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models/documento.model';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {AtividadeCreateDocumentosState} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store/reducers';
import {getAtividadeCreateDocumentosState} from '../../../../../tarefas/tarefa-detail/atividades/atividade-create/store/selectors';


const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state ? state.documentos : null
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


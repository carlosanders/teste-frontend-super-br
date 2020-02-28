import {createSelector} from '@ngrx/store';
import {getDocumentoAppState, DocumentoAppState, DocumentoState} from 'app/main/apps/documento/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {ComponenteDigital} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';
import {AtividadeCreateDocumentosState} from '../../../tarefas/tarefa-detail/atividades/atividade-create/store/reducers';
import {getAtividadeCreateDocumentosState} from '../../../tarefas/tarefa-detail/atividades/atividade-create/store/selectors';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);
const schemaComponenteDigitalSelectors = createSchemaSelectors<ComponenteDigital>(componenteDigitalSchema);

export const getDocumentoState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.documento
);

export const getDocumentoId = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.loaded.value : null
);

export const getCurrentComponenteDigitalId = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.currentComponenteDigitalId : null
);

export const getCurrentComponenteDigital = createSelector(
    schemaComponenteDigitalSelectors.getNormalizedEntities,
    getCurrentComponenteDigitalId,
    schemaComponenteDigitalSelectors.entityProjector
);

export const getDocumento = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentoId,
    schemaDocumentoSelectors.entityProjector
);

export const getDocumentoLoaded = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded
);

export const getIsLoading = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loading
);

export const getIsSaving = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.saving
);

export const getAssinandoDocumentosId = createSelector(
    getAtividadeCreateDocumentosState,
    (state: AtividadeCreateDocumentosState) => state ? state.assinandoDocumentoIds : null
);

export const getErrors = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.errors
);

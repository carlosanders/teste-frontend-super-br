import {createSelector} from '@ngrx/store';
import {DocumentoAppState, DocumentoState, getDocumentoAppState} from 'app/main/apps/documento/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Documento} from '@cdk/models';
import {componenteDigital as componenteDigitalSchema, documento as documentoSchema} from '@cdk/normalizr';
import {AtividadeCreateDocumentosState} from '../../../tarefas/tarefa-detail/atividades/atividade-create/store';
import {getAtividadeCreateDocumentosState} from '../../../tarefas/tarefa-detail/atividades/atividade-create/store';

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

export const getSavingVinculacaoEtiquetaId = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.savingVinculacaoEtiquetaId
);

export const getVinculacaoEtiquetaErrors = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.vinculacaoEtiquetaErrors
);

import {createSelector} from '@ngrx/store';
import {
    DocumentoEditDadosBasicosAppState,
    DocumentoEditDadosBasicosState,
    getDocumentoEditDadosBasicosAppState
} from '../../../dados-basicos/store/reducers';
import {DocumentoAppState, DocumentoState, getDocumentoAppState} from '../../../../store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentoState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.documento
);

export const getDocumentoId = createSelector(
    getDocumentoState,
    (state: DocumentoState) => state.loaded ? state.loaded.value : null
);

export const getDocumento = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentoId,
    schemaDocumentoSelectors.entityProjector
);

export const getDocumentoEditDadosBasicosState = createSelector(
    getDocumentoEditDadosBasicosAppState,
    (state: DocumentoEditDadosBasicosAppState) => state.documento
);

export const getIsSaving = createSelector(
    getDocumentoEditDadosBasicosState,
    (state: DocumentoEditDadosBasicosState) => state.saving
);

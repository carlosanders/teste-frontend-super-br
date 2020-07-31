import {createSelector} from '@ngrx/store';
import {getDocumentoIdentificadorEditAppState, DocumentoIdentificadorEditAppState, DocumentoIdentificadorEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {DocumentoIdentificador} from '@cdk/models';
import {documentoIdentificador as documentoIdentificadorchema} from '@cdk/normalizr';

const schemaDocumentoIdentificadorelectors = createSchemaSelectors<DocumentoIdentificador>(documentoIdentificadorchema);

export const getDocumentoIdentificadorEditState = createSelector(
    getDocumentoIdentificadorEditAppState,
    (state: DocumentoIdentificadorEditAppState) => state.documentoIdentificador
);

export const getDocumentoIdentificadorId = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoIdentificador = createSelector(
    schemaDocumentoIdentificadorelectors.getNormalizedEntities,
    getDocumentoIdentificadorId,
    schemaDocumentoIdentificadorelectors.entityProjector
);

export const getIsSaving = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.loaded
);

export const getErrors = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.errors
);

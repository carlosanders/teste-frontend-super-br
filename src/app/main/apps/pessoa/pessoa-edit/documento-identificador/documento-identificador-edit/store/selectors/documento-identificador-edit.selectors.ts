import {createSelector} from '@ngrx/store';
import {
    DocumentoIdentificadorEditAppState,
    DocumentoIdentificadorEditState,
    getDocumentoIdentificadorEditAppState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {DocumentoIdentificador} from '@cdk/models';
import {documentoIdentificador as documentoIdentificadorchema} from '@cdk/normalizr';

const schemaDocumentoIdentificadorelectors = createSchemaSelectors<DocumentoIdentificador>(documentoIdentificadorchema);

export const getDocumentoIdentificadorEditState: any = createSelector(
    getDocumentoIdentificadorEditAppState,
    (state: DocumentoIdentificadorEditAppState) => state.documentoIdentificador
);

export const getDocumentoIdentificadorId: any = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoIdentificador: any = createSelector(
    schemaDocumentoIdentificadorelectors.getNormalizedEntities,
    getDocumentoIdentificadorId,
    schemaDocumentoIdentificadorelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getDocumentoIdentificadorEditState,
    (state: DocumentoIdentificadorEditState) => state.errors
);

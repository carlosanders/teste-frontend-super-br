import {createSelector} from '@ngrx/store';
import {
    getResponderComplementarAppState,
    ResponderComplementarAppState,
    ResponderComplentarDocumentosState
} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models/documento.model';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';

const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getResponderComplementarDocumentosState = createSelector(
    getResponderComplementarAppState,
    (state: ResponderComplementarAppState) => state ? state.responderComplementarDocumentos : null
);

export const getDocumentosId = createSelector(
    getResponderComplementarDocumentosState,
    (state: ResponderComplentarDocumentosState) => state.documentosId
);

export const getDocumentos = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded = createSelector(
    getResponderComplementarDocumentosState,
    (state: ResponderComplentarDocumentosState) => state.documentosLoaded
);


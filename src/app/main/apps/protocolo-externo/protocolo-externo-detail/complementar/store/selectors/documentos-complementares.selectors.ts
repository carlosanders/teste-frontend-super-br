import { createSelector } from '@ngrx/store';
import { DocumentosComplementaresState, getComplementarAppState, ComplementarAppState } from '../reducers';
import { createSchemaSelectors } from '@cdk/ngrx-normalizr';
import { Documento } from '@cdk/models';
import { documento as documentoSchema } from '@cdk/normalizr/documento.schema';


const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosComplementaresState = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state ? state.documentosComplementares : null
);

export const getDocumentosComplementaresId = createSelector(
    getDocumentosComplementaresState,
    (state: DocumentosComplementaresState) => state.documentosId
);


export const getDocumentosComplementares = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosComplementaresId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosComplementaresHasLoaded = createSelector(
    getDocumentosComplementaresState,
    (state: DocumentosComplementaresState) => state.documentosLoaded
);

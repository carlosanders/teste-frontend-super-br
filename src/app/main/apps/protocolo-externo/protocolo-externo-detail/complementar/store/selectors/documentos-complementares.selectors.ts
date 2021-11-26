import {createSelector} from '@ngrx/store';
import {ComplementarAppState, DocumentosComplementaresState, getComplementarAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {Documento} from '@cdk/models';
import {documento as documentoSchema} from '@cdk/normalizr';


const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosComplementaresState: any = createSelector(
    getComplementarAppState,
    (state: ComplementarAppState) => state ? state.documentosComplementares : null
);

export const getDocumentosComplementaresId: any = createSelector(
    getDocumentosComplementaresState,
    (state: DocumentosComplementaresState) => state.documentosId
);


export const getDocumentosComplementares: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosComplementaresId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosComplementaresHasLoaded: any = createSelector(
    getDocumentosComplementaresState,
    (state: DocumentosComplementaresState) => state.documentosLoaded
);


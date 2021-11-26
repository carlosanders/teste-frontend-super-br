import {createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoAppState,
    DocumentosAvulsoState,
    getDocumentoAvulsoAppState
} from 'app/main/apps/oficios/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';

const schemaSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getDocumentosAvulsoState: any = createSelector(
    getDocumentoAvulsoAppState,
    (state: DocumentoAvulsoAppState) => state.documentosAvulso
);

export const getSelectedDocumentoAvulsoIds: any = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.selectedDocumentoAvulsoIds
);

export const getMaximizado: any = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.maximizado
);

export const getDocumentosAvulsoIds: any = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.entitiesId
);

export const getDocumentosAvulso: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentosAvulsoIds,
    schemaSelectors.entitiesProjector
);

export const getSelectedDocumentosAvulso: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getSelectedDocumentoAvulsoIds,
    schemaSelectors.entitiesProjector
);

export const getPagination: any = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.pagination
);

export const getDocumentosAvulsoLoaded: any = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getDocumentosAvulsoState,
    (state: DocumentosAvulsoState) => state.loading
);

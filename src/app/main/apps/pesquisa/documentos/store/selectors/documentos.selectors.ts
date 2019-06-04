import {createSelector} from '@ngrx/store';
import {
    getDocumentosAppState,
    DocumentosAppState,
    DocumentosState
} from 'app/main/apps/pesquisa/documentos/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr/documento.schema';
import {Documento} from '@cdk/models/documento.model';

const schemaSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentosState = createSelector(
    getDocumentosAppState,
    (state: DocumentosAppState) => state.documentos
);

export const getDocumentosIds = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.entitiesId
);

export const getDocumentos = createSelector(
    schemaSelectors.getNormalizedEntities,
    getDocumentosIds,
    schemaSelectors.entitiesProjector
);

export const getPagination = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.pagination
);

export const getIsLoading = createSelector(
    getDocumentosState,
    (state: DocumentosState) => state.loading
);

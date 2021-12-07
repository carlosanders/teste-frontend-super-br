import {createSelector} from '@ngrx/store';
import {
    getDocumentoAvulsoDetailAppState,
    OficioDetailAppState,
    OficioDetailState
} from 'app/main/apps/oficios/oficio-detail/store/reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema, documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {Documento} from '@cdk/models/documento.model';

const schemaDocumentoAvulsoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);
const schemaDocumentoSelectors = createSchemaSelectors<Documento>(documentoSchema);

export const getDocumentoAvulsoState: any = createSelector(
    getDocumentoAvulsoDetailAppState,
    (state: OficioDetailAppState) => state.oficioDetail
);

export const getIsLoading: any = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.loading
);

export const getIsSaving: any = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.loaded
);

export const getDocumentoAvulsoId: any = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoAvulso: any = createSelector(
    schemaDocumentoAvulsoSelectors.getNormalizedEntities,
    getDocumentoAvulsoId,
    schemaDocumentoAvulsoSelectors.entityProjector
);

export const getErrors: any = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.errors
);

export const getDocumentosId: any = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.documentosId
);

export const getDocumentos: any = createSelector(
    schemaDocumentoSelectors.getNormalizedEntities,
    getDocumentosId,
    schemaDocumentoSelectors.entitiesProjector
);

export const getDocumentosHasLoaded: any = createSelector(
    getDocumentoAvulsoState,
    (state: OficioDetailState) => state.documentosLoaded
);

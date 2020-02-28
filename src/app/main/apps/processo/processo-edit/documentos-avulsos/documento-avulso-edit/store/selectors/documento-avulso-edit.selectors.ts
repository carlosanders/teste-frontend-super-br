import {createSelector} from '@ngrx/store';
import {getDocumentoAvulsoEditAppState, DocumentoAvulsoEditAppState, DocumentoAvulsoEditState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr/documento-avulso.schema';

const schemaDocumentoAvulsoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getDocumentoAvulsoEditState = createSelector(
    getDocumentoAvulsoEditAppState,
    (state: DocumentoAvulsoEditAppState) => state.documentoAvulso
);

export const getDocumentoAvulsoId = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoAvulso = createSelector(
    schemaDocumentoAvulsoSelectors.getNormalizedEntities,
    getDocumentoAvulsoId,
    schemaDocumentoAvulsoSelectors.entityProjector
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.saving
);

export const getHasLoaded = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.loaded
);

export const getErrors = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.errors
);

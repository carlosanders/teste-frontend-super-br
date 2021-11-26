import {createSelector} from '@ngrx/store';
import {DocumentoAvulsoEditAppState, DocumentoAvulsoEditState, getDocumentoAvulsoEditAppState} from '../reducers';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {DocumentoAvulso} from '@cdk/models';
import {documentoAvulso as documentoAvulsoSchema} from '@cdk/normalizr';

const schemaDocumentoAvulsoSelectors = createSchemaSelectors<DocumentoAvulso>(documentoAvulsoSchema);

export const getDocumentoAvulsoEditState: any = createSelector(
    getDocumentoAvulsoEditAppState,
    (state: DocumentoAvulsoEditAppState) => state.documentoAvulso
);

export const getDocumentoAvulsoId: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.loaded ? state.loaded.value : null
);

export const getDocumentoAvulso: any = createSelector(
    schemaDocumentoAvulsoSelectors.getNormalizedEntities,
    getDocumentoAvulsoId,
    schemaDocumentoAvulsoSelectors.entityProjector
);

export const getIsSaving: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.saving
);

export const getHasLoaded: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.loaded
);

export const getErrors: any = createSelector(
    getDocumentoAvulsoEditState,
    (state: DocumentoAvulsoEditState) => state.errors
);

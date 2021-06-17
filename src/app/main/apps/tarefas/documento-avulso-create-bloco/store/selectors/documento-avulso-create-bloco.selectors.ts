import {createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoCreateBlocoAppState,
    DocumentoAvulsoCreateBlocoState,
    getDocumentoAvulsoCreateBlocoAppState
} from '../reducers';

export const getDocumentoAvulsoCreateBlocoState = createSelector(
    getDocumentoAvulsoCreateBlocoAppState,
    (state: DocumentoAvulsoCreateBlocoAppState) => state.documentoAvulsoCreateBloco
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoCreateBlocoState,
    (state: DocumentoAvulsoCreateBlocoState) => state.savingProcessosId.length > 0
);

export const getErrors = createSelector(
    getDocumentoAvulsoCreateBlocoState,
    (state: DocumentoAvulsoCreateBlocoState) => state.errors
);

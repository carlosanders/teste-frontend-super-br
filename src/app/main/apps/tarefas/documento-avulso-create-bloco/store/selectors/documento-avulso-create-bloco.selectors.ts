import {createSelector} from '@ngrx/store';
import {
    DocumentoAvulsoCreateBlocoAppState,
    DocumentoAvulsoCreateBlocoState,
    getDocumentoAvulsoCreateBlocoAppState
} from '../reducers';

export const getDocumentoAvulsoCreateBlocoState: any = createSelector(
    getDocumentoAvulsoCreateBlocoAppState,
    (state: DocumentoAvulsoCreateBlocoAppState) => state.documentoAvulsoCreateBloco
);

export const getIsSaving: any = createSelector(
    getDocumentoAvulsoCreateBlocoState,
    (state: DocumentoAvulsoCreateBlocoState) => state.savingProcessosId.length > 0
);

export const getErrors: any = createSelector(
    getDocumentoAvulsoCreateBlocoState,
    (state: DocumentoAvulsoCreateBlocoState) => state.errors
);

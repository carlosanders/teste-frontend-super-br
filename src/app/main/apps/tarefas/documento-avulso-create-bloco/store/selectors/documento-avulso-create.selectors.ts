import {createSelector} from '@ngrx/store';
import {getDocumentoAvulsoCreateAppState, DocumentoAvulsoCreateAppState, DocumentoAvulsoCreateState} from '../reducers';

export const getDocumentoAvulsoCreateState = createSelector(
    getDocumentoAvulsoCreateAppState,
    (state: DocumentoAvulsoCreateAppState) => state.documentoAvulsoCreate
);

export const getIsSaving = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.savingProcessosId.length > 0
);

export const getErrors = createSelector(
    getDocumentoAvulsoCreateState,
    (state: DocumentoAvulsoCreateState) => state.errors
);

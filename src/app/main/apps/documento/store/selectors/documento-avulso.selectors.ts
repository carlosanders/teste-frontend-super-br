import {createSelector} from '@ngrx/store';
import {getDocumentoAppState, DocumentoAppState, DocumentoAvulsoState} from '../reducers';

export const getDocumentoAvulsoState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.documentoAvulso
);

export const getDocumentoAvulsoIsSaving = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoState) => state.saving
);

export const getDocumentoAvulsoIsRemetendo = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoState) => state.remetendo
);

export const getDocumentoAvulsoIsEncerrando = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoState) => state.encerrando
);

export const getDocumentoAvulsoErrors = createSelector(
    getDocumentoAvulsoState,
    (state: DocumentoAvulsoState) => state.errors
);

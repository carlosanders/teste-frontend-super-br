import {createSelector} from '@ngrx/store';
import {AtividadeDocumentoState, getDocumentoEditAtividadeAppState, DocumentoEditAtividadeAppState} from '../reducers';

export const getAtividadeDocumentoState = createSelector(
    getDocumentoEditAtividadeAppState,
    (state: DocumentoEditAtividadeAppState) => state.atividadeDocumento
);

export const getAtividadeIsSaving = createSelector(
    getAtividadeDocumentoState,
    (state: AtividadeDocumentoState) => state.saving
);

export const getAtividadeErrors = createSelector(
    getAtividadeDocumentoState,
    (state: AtividadeDocumentoState) => state.errors
);

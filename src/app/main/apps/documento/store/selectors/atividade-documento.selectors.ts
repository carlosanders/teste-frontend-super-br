import {createSelector} from '@ngrx/store';
import {AtividadeDocumentoState, getDocumentoAppState, DocumentoAppState} from '../reducers';

export const getAtividadeDocumentoState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state.atividadeDocumento
);

export const getAtividadeIsSaving = createSelector(
    getAtividadeDocumentoState,
    (state: AtividadeDocumentoState) => state.saving
);

export const getAtividadeErrors = createSelector(
    getAtividadeDocumentoState,
    (state: AtividadeDocumentoState) => state.errors
);

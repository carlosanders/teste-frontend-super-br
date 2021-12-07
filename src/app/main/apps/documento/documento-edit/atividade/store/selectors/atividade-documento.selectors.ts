import {createSelector} from '@ngrx/store';
import {AtividadeDocumentoState, DocumentoEditAtividadeAppState, getDocumentoEditAtividadeAppState} from '../reducers';

export const getAtividadeDocumentoState: any = createSelector(
    getDocumentoEditAtividadeAppState,
    (state: DocumentoEditAtividadeAppState) => state.atividadeDocumento
);

export const getAtividadeIsSaving: any = createSelector(
    getAtividadeDocumentoState,
    (state: AtividadeDocumentoState) => state.saving
);

export const getAtividadeErrors: any = createSelector(
    getAtividadeDocumentoState,
    (state: AtividadeDocumentoState) => state.errors
);


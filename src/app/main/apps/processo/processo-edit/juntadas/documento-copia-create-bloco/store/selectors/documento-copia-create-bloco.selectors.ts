import {createSelector} from '@ngrx/store';
import {
    DocumentoCopiaCreateBlocoAppState,
    DocumentoCopiaCreateBlocoState,
    getDocumentoCopiaCreateBlocoAppState
} from '../reducers';

export const getDocumentoCopiaCreateBlocoState = createSelector(
    getDocumentoCopiaCreateBlocoAppState,
    (state: DocumentoCopiaCreateBlocoAppState) => state.documentoCopiaCreateBloco
);

export const getIsSaving = createSelector(
    getDocumentoCopiaCreateBlocoState,
    (state: DocumentoCopiaCreateBlocoState) => state.savingJuntadasId.length > 0
);

export const getErrors = createSelector(
    getDocumentoCopiaCreateBlocoState,
    (state: DocumentoCopiaCreateBlocoState) => state.errors
);

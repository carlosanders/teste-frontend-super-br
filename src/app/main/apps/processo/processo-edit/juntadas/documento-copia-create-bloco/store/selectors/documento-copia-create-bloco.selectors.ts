import {createSelector} from '@ngrx/store';
import {
    DocumentoCopiaCreateBlocoAppState,
    DocumentoCopiaCreateBlocoState,
    getDocumentoCopiaCreateBlocoAppState
} from '../reducers';

export const getDocumentoCopiaCreateBlocoState: any = createSelector(
    getDocumentoCopiaCreateBlocoAppState,
    (state: DocumentoCopiaCreateBlocoAppState) => state.documentoCopiaCreateBloco
);

export const getIsSaving: any = createSelector(
    getDocumentoCopiaCreateBlocoState,
    (state: DocumentoCopiaCreateBlocoState) => state.savingJuntadasId.length > 0
);

export const getErrors: any = createSelector(
    getDocumentoCopiaCreateBlocoState,
    (state: DocumentoCopiaCreateBlocoState) => state.errors
);

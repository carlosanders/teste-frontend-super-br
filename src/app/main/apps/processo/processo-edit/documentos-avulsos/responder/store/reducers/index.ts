import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentoAvulsoResponderReducer, DocumentoAvulsoResponderState } from './responder.reducer';

export interface DocumentoAvulsoResponderAppState
{
    documentoAvulso: DocumentoAvulsoResponderState;
}

export const getDocumentoAvulsoResponderAppState = createFeatureSelector<DocumentoAvulsoResponderAppState>(
    'responder-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoResponderAppState,
    (state: DocumentoAvulsoResponderAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoResponderAppState> = {
    documentoAvulso: DocumentoAvulsoResponderReducer
};

export * from './responder.reducer';

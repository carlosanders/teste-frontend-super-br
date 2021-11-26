import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {documentoAvulsoResponderReducer, DocumentoAvulsoResponderState} from './responder.reducer';

export interface DocumentoAvulsoResponderAppState
{
    documentoAvulso: DocumentoAvulsoResponderState;
}

export const getDocumentoAvulsoResponderAppState = createFeatureSelector<DocumentoAvulsoResponderAppState>(
    'responder-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoResponderAppState,
    (state: DocumentoAvulsoResponderAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoResponderAppState> = {
    documentoAvulso: documentoAvulsoResponderReducer
};

export * from './responder.reducer';

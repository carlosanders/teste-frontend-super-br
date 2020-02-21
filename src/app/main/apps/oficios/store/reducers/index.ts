import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentosAvulsoReducer, DocumentosAvulsoState } from './documentos-avulso.reducer';

export interface DocumentoAvulsoAppState
{
    documentosAvulso: DocumentosAvulsoState;
}

export const getDocumentoAvulsoAppState = createFeatureSelector<DocumentoAvulsoAppState>(
    'documentos-avulso-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoAppState,
    (state: DocumentoAvulsoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoAppState> = {
    documentosAvulso: DocumentosAvulsoReducer
};

export * from './documentos-avulso.reducer';

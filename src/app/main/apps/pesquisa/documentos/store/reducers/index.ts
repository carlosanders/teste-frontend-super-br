import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentosReducer, DocumentosState } from './documentos.reducer';

export interface DocumentosAppState
{
    documentos: DocumentosState;
}

export const getDocumentosAppState = createFeatureSelector<DocumentosAppState>(
    'pesquisa-documentos-app'
);

export const getAppState = createSelector(
    getDocumentosAppState,
    (state: DocumentosAppState) => state
);

export const reducers: ActionReducerMap<DocumentosAppState> = {
    documentos: DocumentosReducer
};

export * from './documentos.reducer';

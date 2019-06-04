import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentoReducer, DocumentoState } from './documento.reducer';
import { DocumentosVinculadosReducer, DocumentosVinculadosState } from './documentos-vinculados.reducer';

export interface DocumentoAppState
{
    documento: DocumentoState;
    documentosVinculados: DocumentosVinculadosState;
}

export const getDocumentoAppState = createFeatureSelector<DocumentoAppState>(
    'documento-app'
);

export const getAppState = createSelector(
    getDocumentoAppState,
    (state: DocumentoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAppState> = {
    documento: DocumentoReducer,
    documentosVinculados: DocumentosVinculadosReducer
};

export * from './documento.reducer';
export * from './documentos-vinculados.reducer';

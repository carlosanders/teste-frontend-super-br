import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { OficiosReducer, DocumentosAvulsoState } from './oficios.reducer';

export interface DocumentoAvulsoAppState
{
    documentosAvulso: DocumentosAvulsoState;
}

export const getDocumentoAvulsoAppState = createFeatureSelector<DocumentoAvulsoAppState>(
    'oficio-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoAppState,
    (state: DocumentoAvulsoAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoAppState> = {
    documentosAvulso: OficiosReducer
};

export * from './oficios.reducer';
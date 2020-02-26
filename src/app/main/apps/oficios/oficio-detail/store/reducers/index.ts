import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentoAvulsoDetailReducer, DocumentoAvulsoDetailState } from './oficio-detail.reducer';

export interface DocumentoAvulsoDetailAppState
{
    documentoAvulsoDetail: DocumentoAvulsoDetailState;
}

export const getDocumentoAvulsoDetailAppState = createFeatureSelector<DocumentoAvulsoDetailAppState>(
    'oficio-detail-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoDetailAppState,
    (state: DocumentoAvulsoDetailAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoDetailAppState> = {
    documentoAvulsoDetail: DocumentoAvulsoDetailReducer
};

export * from './oficio-detail.reducer';

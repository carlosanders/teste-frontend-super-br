import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentoAvulsoCreateReducer, DocumentoAvulsoCreateState } from './documento-avulso-create.reducer';

export interface DocumentoAvulsoCreateAppState
{
    documentoAvulsoCreate: DocumentoAvulsoCreateState;
}

export const getDocumentoAvulsoCreateAppState = createFeatureSelector<DocumentoAvulsoCreateAppState>(
    'documento-avulso-create-bloco-app'
);

export const getAppState = createSelector(
    getDocumentoAvulsoCreateAppState,
    (state: DocumentoAvulsoCreateAppState) => state
);

export const reducers: ActionReducerMap<DocumentoAvulsoCreateAppState> = {
    documentoAvulsoCreate: DocumentoAvulsoCreateReducer
};

export * from './documento-avulso-create.reducer';
